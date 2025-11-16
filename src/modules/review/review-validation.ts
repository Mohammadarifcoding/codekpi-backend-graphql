import z from "zod";
import { DepartmentEnum, ShiftEnum } from "../user/user.validation";

export const createReviewSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),

  text: z
    .string()
    .min(10, "Review text must be at least 10 characters")
    .max(500, "Review text too long"),

  rating: z
    .number()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),

  department: DepartmentEnum,
  session: z
    .string()
    .regex(
      /^\d{2}-\d{2}$/,
      "Session must follow the format NN-NN (e.g., 19-20)"
    ),
  shift: ShiftEnum,
  userImage: z.string(),
  status: z.enum(["pending", "approved"]).default("pending"),
});

export const updateReviewSchema = createReviewSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field must be provided for update",
  });

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;

export const reviewValidation = { createReviewSchema, updateReviewSchema };
