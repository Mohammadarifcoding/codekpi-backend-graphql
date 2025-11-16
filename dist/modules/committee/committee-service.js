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
exports.CommitteeService = exports.deleteCommittee = exports.createCommittee = void 0;
const ApiError_1 = require("../../constants/ApiError");
const logger_1 = __importDefault(require("../../constants/logger"));
const safe_execute_1 = require("../../constants/safe-execute");
const db_1 = __importDefault(require("../../services/db"));
const authorization_1 = require("../../utils/authorization");
const validateInput_1 = require("../../utils/validateInput");
const user_service_1 = require("../user/user-service");
const committee_validation_1 = require("./committee-validation");
/**
 * @desc Create a new committee
 */
const createCommittee = (input, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Input validation
    (0, validateInput_1.validateInput)(committee_validation_1.committeeValidation.createCommitteeSchema, input, "Create Committee");
    // Auth check
    const user = yield user_service_1.userService.findUserOrThrow({ userId });
    authorization_1.authorization.requireAdmin(user);
    // Safe execution with consistent response
    return (0, safe_execute_1.safeExecute)(() => __awaiter(void 0, void 0, void 0, function* () {
        const committee = yield db_1.default.committee.create({ data: input });
        logger_1.default.info("Committee created", {
            createdBy: userId,
            committeeId: committee.id,
        });
        return {
            success: true,
            message: "Committee created successfully",
            data: committee,
        };
    }));
});
exports.createCommittee = createCommittee;
/**
 * @desc Delete a committee by ID
 */
const deleteCommittee = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id)
        throw new ApiError_1.ApiError("Committee ID is required", 400);
    const user = yield user_service_1.userService.findUserOrThrow({ userId });
    authorization_1.authorization.requireAdmin(user);
    return (0, safe_execute_1.safeExecute)(() => __awaiter(void 0, void 0, void 0, function* () {
        const deleted = yield db_1.default.committee.delete({ where: { id } });
        logger_1.default.info("Committee deleted", { deletedBy: userId, committeeId: id });
        return {
            success: true,
            message: "Committee deleted successfully",
            data: deleted,
        };
    }));
});
exports.deleteCommittee = deleteCommittee;
/**
 * @desc Update committee by ID
 */
const updateCommittee = (id, data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userService.findUserOrThrow({ userId });
    authorization_1.authorization.requireAdmin(user);
    (0, validateInput_1.validateInput)(committee_validation_1.committeeValidation.updateCommitteeSchema, data, "Update Committee");
    return yield (0, safe_execute_1.safeExecute)(() => __awaiter(void 0, void 0, void 0, function* () {
        const committee = yield db_1.default.committee.update({
            where: { id },
            data: data,
        });
        return {
            message: "Committee updated successfully",
            success: true,
            data: committee,
        };
    }));
});
/**
 * @desc Get all committees
 */
const getAllCommittees = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.default.committee.findMany({
        where: { createdAt: { gt: new Date(0) } },
    });
    return {
        success: true,
        message: "Committee fetched successfully ✅",
        data: data,
    };
});
/**
 * @desc Create Committee member
 */
const createCommitteeMember = (input, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(input);
    (0, validateInput_1.validateInput)(committee_validation_1.committeeValidation.CommitteeMemberCreateSchema, input, "Create Committee Member");
    const user = yield user_service_1.userService.findUserOrThrow({ userId });
    authorization_1.authorization.requireAdmin(user);
    return (0, safe_execute_1.safeExecute)(() => __awaiter(void 0, void 0, void 0, function* () {
        let memberPictureId;
        if (input.memberPicture) {
            const picture = yield db_1.default.picture.create({
                data: {
                    image: input.memberPicture,
                },
            });
            memberPictureId = picture.id;
        }
        const { memberPicture, committeeId } = input, rest = __rest(input, ["memberPicture", "committeeId"]);
        const committeeMember = yield db_1.default.committeeMember.create({
            data: Object.assign(Object.assign(Object.assign({}, rest), { committee: { connect: { id: committeeId } } }), (memberPictureId && {
                memberPicture: { connect: { id: memberPictureId } },
            })),
            include: { memberPicture: true, committee: true },
        });
        return {
            success: true,
            message: "Committee member created successfully",
            data: committeeMember,
        };
    }));
});
exports.CommitteeService = {
    createCommittee: exports.createCommittee,
    deleteCommittee: exports.deleteCommittee,
    updateCommittee,
    getAllCommittees,
    createCommitteeMember,
};
