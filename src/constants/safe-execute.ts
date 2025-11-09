import { Prisma } from "@prisma/client";
import type { ApiResponse } from "./ApiResponse";
import { ApiError } from "./ApiError";
import { success, ZodError } from "zod";
import logger from "./logger";

type AsyncFn<T> = () => Promise<T>;

export async function safeExecute<T>(
  fn: AsyncFn<ApiResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    const result = await fn();
    return {
      success: result.success,
      message: result.message,
      data: result.data as T,
    };
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        throw new ApiError("Duplicate Record Error", 400, error.meta);
      if (error.code === "P2025")
        throw new ApiError("Record not found", 400, error.meta);
      throw new ApiError("Database Error", 500, error.meta);
    }

    if (error instanceof ZodError)
      throw new ApiError("Invalid input", 400, error.flatten());

    if (error instanceof ApiError) throw error;

    logger.error("Unhandled Error", { error });
    throw new ApiError("Internal Server Error", 500);
  }
}
