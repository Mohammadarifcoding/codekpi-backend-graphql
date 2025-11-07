import type { ZodSchema } from "zod";
import { ApiError } from "../constants/ApiError";
import logger from "../constants/logger";

export const validateInput = <T extends ZodSchema<unknown>>(
  schema: T,
  input: unknown,
  context?: string
) => {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    // Extract all issues clearly
    const errors = parsed.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
      code: issue.code,
    }));

    const location = context ? `[${context}]` : "";
    logger.warn(`Validation failed ${location}`, { errors });

    // Provide structured details to ApiError
    throw new ApiError("Invalid Input", 400, {
      context,
      errors,
    });
  }

  return parsed.data;
};
