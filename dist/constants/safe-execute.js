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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeExecute = safeExecute;
const client_1 = require("@prisma/client");
const ApiError_1 = require("./ApiError");
const zod_1 = require("zod");
const logger_1 = __importDefault(require("./logger"));
function safeExecute(fn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield fn();
            return {
                success: result.success,
                message: result.message,
                data: result.data,
            };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002")
                    throw new ApiError_1.ApiError("Duplicate Record Error", 400, error.meta);
                if (error.code === "P2025")
                    throw new ApiError_1.ApiError("Record not found", 400, error.meta);
                throw new ApiError_1.ApiError("Database Error", 500, error.meta);
            }
            if (error instanceof zod_1.ZodError)
                throw new ApiError_1.ApiError("Invalid input", 400, error.flatten());
            if (error instanceof ApiError_1.ApiError)
                throw error;
            logger_1.default.error("Unhandled Error", { error });
            throw new ApiError_1.ApiError("Internal Server Error", 500);
        }
    });
}
