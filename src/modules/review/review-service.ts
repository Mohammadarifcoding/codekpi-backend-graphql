import { Department, Shift, Status, type Review } from "@prisma/client";
import prisma from "../../services/db";
import { pictureService } from "../picture/picture-service";
import { sessionMap } from "./review-utis";
import { userService } from "../user/user-service";
import { authorization } from "../../utils/authorization";
type CreateReviewInput = {
  name: string;
  text: string;
  rating: number;
  department: Department;
  session: string;
  shift: Shift;
  userImage: string; // <-- this comes from GraphQL
};

const createReview = async (data: CreateReviewInput) => {
  if (!data.userImage) {
    throw new Error("User image is required");
  }

  const picture = await pictureService.createPicture(data.userImage, prisma); // <— use userImage

  const { userImage, ...reviewData } = data;

  const sessionKey = (
    Object.keys(sessionMap) as Array<keyof typeof sessionMap>
  ).find((key) => {
    return sessionMap[key] == reviewData.session;
  });
  if (!sessionKey) {
    throw new Error("Invalid session value");
  }

  const newReview = await prisma.review.create({
    data: {
      ...reviewData,
      session: sessionKey,
      status: "APPROVED",
      userImage: { connect: { id: picture.id } },
    },
  });

  return {
    message: "Review created successfully ✅",
    review: newReview,
  };
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

const getAllReviews = async (page: string = "1", limit: string = "10") => {
  let page_int = parseInt(page);
  let limit_int = parseInt(limit);
  const skip = (page_int - 1) * limit_int;
  const reviews = await prisma.review.findMany({
    skip,
    take: limit_int,
    orderBy: { createdAt: "desc" },
  });
  return {
    message: "Reviews fetched successfully ✅",
    data: reviews,
    page: page,
    limit: limit,
    total: await prisma.review.count({ where: { status: "APPROVED" } }),
  };
};

const deleteReview = async (id: string) => {
  const deletedReview = await prisma.review.delete({
    where: { id },
  });
  if (deletedReview.userImageId) {
    await prisma.picture.delete({
      where: { id: deletedReview.userImageId },
    });
  }
  return {
    message: "Review deleted successfully ✅",
    success: true,
  };
};
export const reviewService = {
  getAllReviews,
  createReview,
  updateStatus,
  deleteReview,
};
