import * as z from "zod";
import { DepartmentEnum } from "../user/user.validation";
export const CommitteeRoleEnum = z.enum([
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

export const createCommitteeSchema = z.object({
  name: z.string().min(2).max(128),
  year: z
    .number()
    .int()
    .gte(1970)
    .lte(new Date().getFullYear() + 1),
});

export const updateCommitteeSchema = createCommitteeSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field must be provided for update",
  });

export const CommitteeMemberCreateSchema = z.object({
  committeeId: z.string(),

  role: CommitteeRoleEnum,
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),

  department: DepartmentEnum,
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

export const updateCommitteeMemberSchema =
  CommitteeMemberCreateSchema.partial().refine(
    (obj) => Object.keys(obj).length > 0,
    {
      message: "At least one field must be provided for update",
    }
  );

export const committeeValidation = {
  createCommitteeSchema,
  updateCommitteeSchema,
  CommitteeMemberCreateSchema,
  updateCommitteeMemberSchema,
};

export type CommitteeMemberInput = z.infer<typeof CommitteeMemberCreateSchema>;
export type UpdateCommitteeMemberInput = z.infer<
  typeof updateCommitteeMemberSchema
>;
export type CreateCommitteeInput = z.infer<typeof createCommitteeSchema>;
export type UpdateCommitteeInput = z.infer<typeof updateCommitteeSchema>;
