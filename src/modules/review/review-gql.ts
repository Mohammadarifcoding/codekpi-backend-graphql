import { reviewService } from "./review-service";

export const reviewQueryResolver = {
  reviews: async (args: any, data: any, context: any) => {
    return await reviewService.getAllReviews(data.page, data.limit);
  },
};

export const reviewMutationResolver = {
  createReview: async (_: any, data: any) => {
    return await reviewService.createReview(data);
  },
  updateStatus: async (_: any, data: any) => {
    return await reviewService.updateStatus(data.id, data.status);
  },
  deleteReview: async (_: any, data: any) => {
    return await reviewService.deleteReview(data.id);
  },
};
