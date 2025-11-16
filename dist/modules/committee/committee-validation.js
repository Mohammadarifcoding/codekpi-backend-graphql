"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.committeeValidation = exports.updateCommitteeMemberSchema = exports.CommitteeMemberCreateSchema = exports.updateCommitteeSchema = exports.createCommitteeSchema = exports.CommitteeRoleEnum = void 0;
const z = __importStar(require("zod"));
const user_validation_1 = require("../user/user.validation");
exports.CommitteeRoleEnum = z.enum([
    "PRESIDENT",
    "VICE_PRESIDENT",
    "GENERAL_SECRETARY",
    "JOINT_GENERAL_SECRETARY",
    "FINANCE_SECRETARY",
    "OFFICE_SECRETARY",
    "MEDIA_SECRETARY",
    "COMMUNICATION_SECRETARY",
    "PUBLICITY_SECRETARY",
    "MENTOR",
    "ADVISOR",
    "REPRESENTATIVE",
]);
exports.createCommitteeSchema = z.object({
    name: z.string().min(2).max(128),
    year: z
        .number()
        .int()
        .gte(1970)
        .lte(new Date().getFullYear() + 1),
});
exports.updateCommitteeSchema = exports.createCommitteeSchema
    .partial()
    .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field must be provided for update",
});
exports.CommitteeMemberCreateSchema = z.object({
    committeeId: z.string(),
    role: exports.CommitteeRoleEnum,
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    department: user_validation_1.DepartmentEnum,
    session: z.string(),
    speciality: z.string().min(2, "Speciality is required"),
    phone: z
        .string()
        .regex(/^\+?\d{10,15}$/, "Invalid phone number format")
        .trim(),
    memberPicture: z.string().optional().nullable(),
    positionOrder: z.number().optional(),
    year: z.number().min(2000).max(2100).default(2025),
});
exports.updateCommitteeMemberSchema = exports.CommitteeMemberCreateSchema.partial().refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field must be provided for update",
});
exports.committeeValidation = {
    createCommitteeSchema: exports.createCommitteeSchema,
    updateCommitteeSchema: exports.updateCommitteeSchema,
    CommitteeMemberCreateSchema: exports.CommitteeMemberCreateSchema,
    updateCommitteeMemberSchema: exports.updateCommitteeMemberSchema,
};
