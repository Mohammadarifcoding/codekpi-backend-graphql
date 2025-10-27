import { reviewService } from "./review-service";

export const reviewQueryResolver = {
  reviews: async (args: any, data: any, context: any) => {
    return await reviewService.getAllReviews(data.page, data.limit);
  },
};
