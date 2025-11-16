import { Department, Shift, Status, type Review } from "@prisma/client";
import prisma from "../../services/db";
import { pictureService } from "../picture/picture-service";
import { sessionMap } from "./review-utis";
import { userService } from "../user/user-service";
import { authorization } from "../../utils/authorization";
import type { ApiResponse } from "../../constants/ApiResponse";
import {
  createReviewSchema,
  type CreateReviewInput,
} from "./review-validation";
import { validateInput } from "../../utils/validateInput";
import { safeExecute } from "../../constants/safe-execute";

const createReview = async (data: CreateReviewInput): Promise<ApiResponse> => {
  validateInput(createReviewSchema, data, "Create Review");

  const picture = await pictureService.createPicture(data.userImage, prisma); // <— use userImage
  console.log(picture);
  const { userImage, ...reviewData } = data;

  // const sessionKey = (
  //   Object.keys(sessionMap) as Array<keyof typeof sessionMap>
  // ).find((key) => {
  //   return sessionMap[key] == reviewData.session;
  // });
  // if (!sessionKey) {
  //   throw new Error("Invalid session value");
  // }
  return safeExecute(async () => {
    const newReview = await prisma.review.create({
      data: {
        ...reviewData,
        status: "PENDING",
        userImage: { connect: { id: picture.id } },
      },
      include: { userImage: true },
    });

    return {
      success: true,
      message: "Review created successfully ✅",
      data: newReview,
    };
  });
};

const updateStatus = async (id: string, status: Status, userId: string) => {
  const user = await userService.findUserOrThrow({ userId: userId });
  authorization.requireAdmin(user);

  await prisma.review.update({
    where: { id },
    data: { status: status },
  });

  return {
    message: "Review updated successfully ✅",
    success: true,
  };
};

const getAllReviews = async (
  page: string = "1",
  limit: string = "10"
): Promise<ApiResponse> => {
  let page_int = parseInt(page);
  let limit_int = parseInt(limit);
  const skip = (page_int - 1) * limit_int;
  return safeExecute(async () => {
    const reviews = await prisma.review.findMany({
      skip,
      take: limit_int,
      orderBy: { createdAt: "desc" },
      include: { userImage: true },
    });
    console.log(reviews);
    return {
      message: "Reviews fetched successfully ✅",
      success: true,
      data: reviews,
      page: page_int,
      limit: limit_int,
      total: await prisma.review.count({ where: { status: "APPROVED" } }),
    };
  });
};

const deleteReview = async (id: string): Promise<ApiResponse> => {
  return safeExecute(async () => {
    const deletedReview = await prisma.review.delete({
      where: { id },
      include: { userImage: true },
    });
    if (deletedReview.userImageId) {
      await prisma.picture.delete({
        where: { id: deletedReview.userImageId },
      });
    }
    return {
      message: "Review deleted successfully ✅",
      success: true,
      data: deletedReview,
    };
  });
};
export const reviewService = {
  getAllReviews,
  createReview,
  updateStatus,
  deleteReview,
};
