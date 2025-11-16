export declare const profileQueryResolver: {
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
};
export declare const profileMutationResolver: {
    updateProfile: (_: any, data: any, context: any) => Promise<{
        message: string;
        profile: {
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
        };
    }>;
};
//# sourceMappingURL=profile-gql.d.ts.map