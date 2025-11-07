import * as z from "zod";

const createCommitteeSchema = z.object({
  name: z.string().min(2).max(128),
  year: z
    .number()
    .int()
    .gte(1970)
    .lte(new Date().getFullYear() + 1),
});

const updateCommitteeSchema = createCommitteeSchema
  .partial()
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field must be provided for update",
  });

export const committeeValidation = {
  createCommitteeSchema,
  updateCommitteeSchema,
};

export type CreateCommitteeInput = z.infer<typeof createCommitteeSchema>;
export type UpdateCommitteeInput = z.infer<typeof updateCommitteeSchema>;
