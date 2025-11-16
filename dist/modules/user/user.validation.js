"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderEnum = exports.ShiftEnum = exports.DepartmentEnum = void 0;
const zod_1 = __importDefault(require("zod"));
exports.DepartmentEnum = zod_1.default.enum([
    "COMPUTER",
    "CIVIL",
    "ELECTRICAL",
    "MECHANICAL",
    "ELECTRONICS",
    "POWER",
    "AUTOMOBILE",
    "RAC",
    "OTHER",
]);
exports.ShiftEnum = zod_1.default.enum(["MORNING", "EVENING"]);
exports.GenderEnum = zod_1.default.enum(["MALE", "FEMALE", "OTHER"]);
