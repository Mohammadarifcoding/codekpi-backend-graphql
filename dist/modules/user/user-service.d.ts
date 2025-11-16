export declare const userService: {
    createUser: ({ name, email, password }: any, { res }: any) => Promise<{
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
    signin: ({ email, password }: any, { res }: any) => Promise<{
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
    deleteUser: ({ userId, deleteId, }: {
        userId: string;
        deleteId: string;
    }, { res }: any) => Promise<{
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
    updatePassword: ({ userId, oldPassword, newPassword }: any) => Promise<{
        message: string;
    }>;
    getUsers: (page: number | undefined, limit: number | undefined, userId: string) => Promise<{
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
    findUserOrThrow: ({ userId, email, message, }: {
        userId?: string;
        email?: string;
        message?: string;
    }) => Promise<{
        name: string;
        id: string;
        email: string;
        avatarId: string | null;
        createdAt: Date;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    checkPassword: ({ user, password }: any) => Promise<boolean>;
    validateEmailAvailable: (email: string) => Promise<void>;
    createOTP: ({ email }: any) => Promise<{
        message: string;
        success: boolean;
    }>;
    verifyOTP: ({ email, code }: {
        email: string;
        code: string;
    }) => Promise<{
        message: string;
        success: boolean;
        verified: boolean;
        resetToken: string;
    }>;
    changePassword: ({ token, newPassword }: any) => Promise<{
        message: string;
        success: boolean;
    }>;
};
//# sourceMappingURL=user-service.d.ts.map