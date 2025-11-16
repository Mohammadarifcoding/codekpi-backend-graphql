"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = exports.updateReviewSchema = exports.createReviewSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_validation_1 = require("../user/user.validation");
exports.createReviewSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name too long"),
    text: zod_1.default
        .string()
        .min(10, "Review text must be at least 10 characters")
        .max(500, "Review text too long"),
    rating: zod_1.default
        .number()
        .min(1, "Rating must be between 1 and 5")
        .max(5, "Rating must be between 1 and 5"),
    department: user_validation_1.DepartmentEnum,
    session: zod_1.default
        .string()
        .regex(/^\d{2}-\d{2}$/, "Session must follow the format NN-NN (e.g., 19-20)"),
    shift: user_validation_1.ShiftEnum,
    userImage: zod_1.default.string(),
    status: zod_1.default.enum(["pending", "approved"]).default("pending"),
});
exports.updateReviewSchema = exports.createReviewSchema
    .partial()
    .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field must be provided for update",
});
exports.reviewValidation = { createReviewSchema: exports.createReviewSchema, updateReviewSchema: exports.updateReviewSchema };
