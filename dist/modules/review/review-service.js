"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const db_1 = __importDefault(require("../../services/db"));
const picture_service_1 = require("../picture/picture-service");
const user_service_1 = require("../user/user-service");
const authorization_1 = require("../../utils/authorization");
const review_validation_1 = require("./review-validation");
const validateInput_1 = require("../../utils/validateInput");
const safe_execute_1 = require("../../constants/safe-execute");
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateInput_1.validateInput)(review_validation_1.createReviewSchema, data, "Create Review");
    const picture = yield picture_service_1.pictureService.createPicture(data.userImage, db_1.default); // <— use userImage
    console.log(picture);
    const { userImage } = data, reviewData = __rest(data, ["userImage"]);
    // const sessionKey = (
    //   Object.keys(sessionMap) as Array<keyof typeof sessionMap>
    // ).find((key) => {
    //   return sessionMap[key] == reviewData.session;
    // });
    // if (!sessionKey) {
    //   throw new Error("Invalid session value");
    // }
    return (0, safe_execute_1.safeExecute)(() => __awaiter(void 0, void 0, void 0, function* () {
        const newReview = yield db_1.default.review.create({
            data: Object.assign(Object.assign({}, reviewData), { status: "PENDING", userImage: { connect: { id: picture.id } } }),
            include: { userImage: true },
        });
        return {
            success: true,
            message: "Review created successfully ✅",
            data: newReview,
        };
    }));
});
const updateStatus = (id, status, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userService.findUserOrThrow({ userId: userId });
    authorization_1.authorization.requireAdmin(user);
    yield db_1.default.review.update({
        where: { id },
        data: { status: status },
    });
    return {
        message: "Review updated successfully ✅",
        success: true,
    };
});
const getAllReviews = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = "1", limit = "10") {
    let page_int = parseInt(page);
    let limit_int = parseInt(limit);
    const skip = (page_int - 1) * limit_int;
    return (0, safe_execute_1.safeExecute)(() => __awaiter(void 0, void 0, void 0, function* () {
        const reviews = yield db_1.default.review.findMany({
            skip,
            take: limit_int,
            orderBy: { createdAt: "desc" },
            include: { userImage: true },
        });
        console.log(reviews);
        return {
            message: "Reviews fetched successfully ✅",
            success: true,
            data: reviews,
            page: page_int,
            limit: limit_int,
            total: yield db_1.default.review.count({ where: { status: "APPROVED" } }),
        };
    }));
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, safe_execute_1.safeExecute)(() => __awaiter(void 0, void 0, void 0, function* () {
        const deletedReview = yield db_1.default.review.delete({
            where: { id },
            include: { userImage: true },
        });
        if (deletedReview.userImageId) {
            yield db_1.default.picture.delete({
                where: { id: deletedReview.userImageId },
            });
        }
        return {
            message: "Review deleted successfully ✅",
            success: true,
            data: deletedReview,
        };
    }));
});
exports.reviewService = {
    getAllReviews,
    createReview,
    updateStatus,
    deleteReview,
};
