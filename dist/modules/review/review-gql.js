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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewMutationResolver = exports.reviewQueryResolver = void 0;
const review_service_1 = require("./review-service");
exports.reviewQueryResolver = {
    reviews: (_, data, context) => __awaiter(void 0, void 0, void 0, function* () {
        return yield review_service_1.reviewService.getAllReviews(data.page, data.limit);
    }),
};
exports.reviewMutationResolver = {
    createReview: (_, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield review_service_1.reviewService.createReview(data.input);
    }),
    updateStatus: (_, data, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return yield review_service_1.reviewService.updateStatus(data.id, data.status, (_a = context.user) === null || _a === void 0 ? void 0 : _a.userId);
    }),
    deleteReview: (_, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield review_service_1.reviewService.deleteReview(data.id);
    }),
};
