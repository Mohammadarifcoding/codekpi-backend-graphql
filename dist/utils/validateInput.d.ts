import type { ZodSchema } from "zod";
export declare const validateInput: <T extends ZodSchema<unknown>>(schema: T, input: unknown, context?: string) => import("zod").infer<T>;
//# sourceMappingURL=validateInput.d.ts.map