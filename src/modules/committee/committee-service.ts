import type { Prisma } from "@prisma/client";
import { ApiError } from "../../constants/ApiError";
import type { ApiResponse } from "../../constants/ApiResponse";
import logger from "../../constants/logger";
import { safeExecute } from "../../constants/safe-execute";
import prisma from "../../services/db";
import { authorization } from "../../utils/authorization";
import { validateInput } from "../../utils/validateInput";
import { userService } from "../user/user-service";
import {
  committeeValidation,
  type CreateCommitteeInput,
  type UpdateCommitteeInput,
} from "./committee-validation";

/**
 * @desc Create a new committee
 */
export const createCommittee = async (
  input: CreateCommitteeInput,
  userId: string
): Promise<ApiResponse> => {
  // Input validation
  validateInput(
    committeeValidation.createCommitteeSchema,
    input,
    "Create Committee"
  );

  // Auth check
  const user = await userService.findUserOrThrow({ userId });
  authorization.requireAdmin(user);
  // Safe execution with consistent response
  return safeExecute(async () => {
    const committee = await prisma.committee.create({ data: input });
    logger.info("Committee created", {
      createdBy: userId,
      committeeId: committee.id,
    });

    return {
      success: true,
      message: "Committee created successfully",
      data: committee,
    };
  });
};

/**
 * @desc Delete a committee by ID
 */
export const deleteCommittee = async (
  id: string,
  userId: string
): Promise<ApiResponse> => {
  if (!id) throw new ApiError("Committee ID is required", 400);

  const user = await userService.findUserOrThrow({ userId });
  authorization.requireAdmin(user);

  return safeExecute(async () => {
    const deleted = await prisma.committee.delete({ where: { id } });
    logger.info("Committee deleted", { deletedBy: userId, committeeId: id });

    return {
      success: true,
      message: "Committee deleted successfully",
      data: deleted,
    };
  });
};
/**
 * @desc Update committee by ID
 */
const updateCommittee = async (
  id: string,
  data: UpdateCommitteeInput,
  userId: string
): Promise<ApiResponse> => {
  const user = await userService.findUserOrThrow({ userId });
  authorization.requireAdmin(user);
  validateInput(
    committeeValidation.updateCommitteeSchema,
    data,
    "Update Committee"
  );
  return await safeExecute(async () => {
    const committee = await prisma.committee.update({
      where: { id },
      data: data as Prisma.CommitteeUpdateInput,
    });

    return {
      message: "Committee updated successfully",
      success: true,
      data: committee,
    };
  });
};

export const CommitteeService = {
  createCommittee,
  deleteCommittee,
  updateCommittee,
};
