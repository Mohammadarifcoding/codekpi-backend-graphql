"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const ApiError_1 = require("../constants/ApiError");
const logger_1 = __importDefault(require("../constants/logger"));
const validateInput = (schema, input, context) => {
    const parsed = schema.safeParse(input);
    if (!parsed.success) {
        // Extract all issues clearly
        const errors = parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
            code: issue.code,
        }));
        const location = context ? `[${context}]` : "";
        logger_1.default.warn(`Validation failed ${location}`, { errors });
        // Provide structured details to ApiError
        throw new ApiError_1.ApiError("Invalid Input", 400, {
            context,
            errors,
        });
    }
    return parsed.data;
};
exports.validateInput = validateInput;
