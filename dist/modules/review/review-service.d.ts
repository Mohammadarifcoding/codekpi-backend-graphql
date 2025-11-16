import { Status } from "@prisma/client";
import type { ApiResponse } from "../../constants/ApiResponse";
import { type CreateReviewInput } from "./review-validation";
export declare const reviewService: {
    getAllReviews: (page?: string, limit?: string) => Promise<ApiResponse>;
    createReview: (data: CreateReviewInput) => Promise<ApiResponse>;
    updateStatus: (id: string, status: Status, userId: string) => Promise<{
        message: string;
        success: boolean;
    }>;
    deleteReview: (id: string) => Promise<ApiResponse>;
};
//# sourceMappingURL=review-service.d.ts.map