import type { User } from "@prisma/client";
export declare const authorization: {
    requireAuth: (user: Partial<User>) => Partial<{
        name: string;
        id: string;
        email: string;
        avatarId: string | null;
        createdAt: Date;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    requireRole: (user: Partial<User>, ...allowedRoles: string[]) => void;
    requireAdmin: (user: Partial<User>) => void;
    requireUser: (user: Partial<User>) => void;
    requireModerator: (user: Partial<User>) => void;
};
//# sourceMappingURL=authorization.d.ts.map