export type ApiResponse<T = unknown> = {
    success: boolean;
    message: string;
    data?: T;
    page?: number;
    limit?: number;
    total?: number;
};
//# sourceMappingURL=ApiResponse.d.ts.map