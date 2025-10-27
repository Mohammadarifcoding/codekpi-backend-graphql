import { Status, type Review } from "@prisma/client";
import prisma from "../../services/db";
import { pictureService } from "../picture/picture-service";

const createReview = async (data: Review) => {
  const picture = await pictureService.createPicture(data., tx);
  const newReview = await prisma.review.create({
    data: {...data},
  });

  return {
    message: "Review created successfully ✅",
    review: newReview,
  };
};

const updateStatus = async (id: string, status: Status) => {
  const updatedReview = await prisma.review.update({
    where: { id },
    data: { status: status },
  });

  return {
    message: "Review updated successfully ✅",
    review: updatedReview,
  };
};

const getAllReviews = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const reviews = await prisma.review.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return {
    message: "Reviews fetched successfully ✅",
    reviews: reviews,
    page: page,
    limit: limit,
    total: await prisma.review.count(),
  };
};

const deleteReview = async (id: string) => {
  const deletedReview = await prisma.review.delete({
    where: { id },
  });
  return {
    message: "Review deleted successfully ✅",
    review: deletedReview,
  };
};
export const reviewService = {
  getAllReviews,
  createReview,
  updateStatus,
  deleteReview,
};
