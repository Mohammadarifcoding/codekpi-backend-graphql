import { reviewService } from "./review-service";

export const reviewQueryResolver = {
  reviews: async (_: any, data: any, context: any) => {
    return await reviewService.getAllReviews(data.page, data.limit);
  },
};

export const reviewMutationResolver = {
  createReview: async (_: any, data: any) => {
    return await reviewService.createReview(data.input);
  },
  updateStatus: async (_: any, data: any, context: any) => {
    return await reviewService.updateStatus(
      data.id,
      data.status,
      context.user?.userId
    );
  },
  deleteReview: async (_: any, data: any) => {
    return await reviewService.deleteReview(data.id);
  },
};
