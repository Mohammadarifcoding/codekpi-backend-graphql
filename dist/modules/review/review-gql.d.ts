export declare const reviewQueryResolver: {
    reviews: (_: any, data: any, context: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
};
export declare const reviewMutationResolver: {
    createReview: (_: any, data: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
    updateStatus: (_: any, data: any, context: any) => Promise<{
        message: string;
        success: boolean;
    }>;
    deleteReview: (_: any, data: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
};
//# sourceMappingURL=review-gql.d.ts.map