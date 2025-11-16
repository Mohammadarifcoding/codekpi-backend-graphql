import z from "zod";
export declare const createReviewSchema: z.ZodObject<{
    name: z.ZodString;
    text: z.ZodString;
    rating: z.ZodNumber;
    department: z.ZodEnum<{
        COMPUTER: "COMPUTER";
        CIVIL: "CIVIL";
        ELECTRICAL: "ELECTRICAL";
        MECHANICAL: "MECHANICAL";
        ELECTRONICS: "ELECTRONICS";
        POWER: "POWER";
        AUTOMOBILE: "AUTOMOBILE";
        RAC: "RAC";
        OTHER: "OTHER";
    }>;
    session: z.ZodString;
    shift: z.ZodEnum<{
        MORNING: "MORNING";
        EVENING: "EVENING";
    }>;
    userImage: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        pending: "pending";
        approved: "approved";
    }>>;
}, z.core.$strip>;
export declare const updateReviewSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    rating: z.ZodOptional<z.ZodNumber>;
    department: z.ZodOptional<z.ZodEnum<{
        COMPUTER: "COMPUTER";
        CIVIL: "CIVIL";
        ELECTRICAL: "ELECTRICAL";
        MECHANICAL: "MECHANICAL";
        ELECTRONICS: "ELECTRONICS";
        POWER: "POWER";
        AUTOMOBILE: "AUTOMOBILE";
        RAC: "RAC";
        OTHER: "OTHER";
    }>>;
    session: z.ZodOptional<z.ZodString>;
    shift: z.ZodOptional<z.ZodEnum<{
        MORNING: "MORNING";
        EVENING: "EVENING";
    }>>;
    userImage: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        pending: "pending";
        approved: "approved";
    }>>>;
}, z.core.$strip>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export declare const reviewValidation: {
    createReviewSchema: z.ZodObject<{
        name: z.ZodString;
        text: z.ZodString;
        rating: z.ZodNumber;
        department: z.ZodEnum<{
            COMPUTER: "COMPUTER";
            CIVIL: "CIVIL";
            ELECTRICAL: "ELECTRICAL";
            MECHANICAL: "MECHANICAL";
            ELECTRONICS: "ELECTRONICS";
            POWER: "POWER";
            AUTOMOBILE: "AUTOMOBILE";
            RAC: "RAC";
            OTHER: "OTHER";
        }>;
        session: z.ZodString;
        shift: z.ZodEnum<{
            MORNING: "MORNING";
            EVENING: "EVENING";
        }>;
        userImage: z.ZodString;
        status: z.ZodDefault<z.ZodEnum<{
            pending: "pending";
            approved: "approved";
        }>>;
    }, z.core.$strip>;
    updateReviewSchema: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        text: z.ZodOptional<z.ZodString>;
        rating: z.ZodOptional<z.ZodNumber>;
        department: z.ZodOptional<z.ZodEnum<{
            COMPUTER: "COMPUTER";
            CIVIL: "CIVIL";
            ELECTRICAL: "ELECTRICAL";
            MECHANICAL: "MECHANICAL";
            ELECTRONICS: "ELECTRONICS";
            POWER: "POWER";
            AUTOMOBILE: "AUTOMOBILE";
            RAC: "RAC";
            OTHER: "OTHER";
        }>>;
        session: z.ZodOptional<z.ZodString>;
        shift: z.ZodOptional<z.ZodEnum<{
            MORNING: "MORNING";
            EVENING: "EVENING";
        }>>;
        userImage: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
            pending: "pending";
            approved: "approved";
        }>>>;
    }, z.core.$strip>;
};
//# sourceMappingURL=review-validation.d.ts.map