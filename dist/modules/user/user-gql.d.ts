export declare const userQueryResolver: {
    users: (args: any, data: any, context: any) => Promise<{
        message: string;
        data: ({
            profile: {
                id: string;
                userId: string;
                department: import(".prisma/client").$Enums.Department;
                session: string;
                phone: string | null;
                bio: string | null;
                shift: import(".prisma/client").$Enums.Shift;
                gender: import(".prisma/client").$Enums.Gender;
                roll: string;
                polytechnic: string;
            } | null;
        } & {
            name: string;
            id: string;
            email: string;
            avatarId: string | null;
            createdAt: Date;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        })[];
        page: number;
        limit: number;
        total: number;
    }>;
};
export declare const userMutationResolver: {
    createUser: (_: any, { name, email, password }: any, context: any) => Promise<{
        message: string;
        token: string;
        user: {
            name: string;
            id: string;
            email: string;
            avatarId: string | null;
            createdAt: Date;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    signin: (_: any, { email, password }: any, context: any) => Promise<{
        message: string;
        token: string;
        user: {
            name: string;
            id: string;
            email: string;
            avatarId: string | null;
            createdAt: Date;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    deleteUser: (_: any, data: any, context: any) => Promise<{
        message: string;
        user: {
            name: string;
            id: string;
            email: string;
            avatarId: string | null;
            createdAt: Date;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    updatePassword: (_: any, { oldPassword, newPassword }: any, context: any) => Promise<{
        message: string;
    }>;
    createOTP: (_: any, { email }: any, context: any) => Promise<{
        message: string;
        success: boolean;
    }>;
    verifyOTP: (_: any, { email, code }: any, context: any) => Promise<{
        message: string;
        success: boolean;
        verified: boolean;
        resetToken: string;
    }>;
    changePassword: (_: any, { token, newPassword }: any, context: any) => Promise<{
        message: string;
        success: boolean;
    }>;
};
//# sourceMappingURL=user-gql.d.ts.map