import type { ApiResponse } from "./ApiResponse";
type AsyncFn<T> = () => Promise<T>;
export declare function safeExecute<T>(fn: AsyncFn<ApiResponse<T>>): Promise<ApiResponse<T>>;
export {};
//# sourceMappingURL=safe-execute.d.ts.map