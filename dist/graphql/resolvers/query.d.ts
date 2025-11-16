export declare const Query: {
    allCommittees: (parent: any, args: any, context: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
    reviews: (_: any, data: any, context: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
    profiles: () => Promise<({
        user: {
            name: string;
            id: string;
            email: string;
            avatarId: string | null;
            createdAt: Date;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
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
    })[]>;
    getProfile: (_: any, {}: any, context: any) => Promise<{
        message: string;
        user: {
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
            interestedWorkshops: {
                id: string;
                createdAt: Date;
                title: string;
                content: string;
                bannerId: string | null;
            }[];
        } & {
            name: string;
            id: string;
            email: string;
            avatarId: string | null;
            createdAt: Date;
            password: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    workshops: () => Promise<{
        message: string;
        workshops: ({
            banner: {
                id: string;
                image: string;
            } | null;
            interestedUsers: {
                name: string;
                id: string;
                email: string;
                avatarId: string | null;
                createdAt: Date;
                password: string;
                role: import(".prisma/client").$Enums.Role;
            }[];
        } & {
            id: string;
            createdAt: Date;
            title: string;
            content: string;
            bannerId: string | null;
        })[];
    }>;
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
//# sourceMappingURL=query.d.ts.map