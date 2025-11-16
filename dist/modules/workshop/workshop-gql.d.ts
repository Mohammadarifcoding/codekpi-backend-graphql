export declare const workshopQueryResolver: {
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
};
export declare const workshopMutationResolver: {
    createWorkshop: (_: any, { input: { title, content, banner } }: any, context: any) => Promise<{
        message: string;
        workshop: {
            banner: {
                id: string;
                image: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            title: string;
            content: string;
            bannerId: string | null;
        };
    }>;
    updateWorkshop: (_: any, data: any, context: any) => Promise<{
        message: string;
        workshop: {
            banner: {
                id: string;
                image: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            title: string;
            content: string;
            bannerId: string | null;
        };
    }>;
    deleteWorkshop: (_: any, { id }: any, context: any) => Promise<{
        message: string;
        workshop: {
            id: string;
            createdAt: Date;
            title: string;
            content: string;
            bannerId: string | null;
        };
    }>;
    makeWorkshopInterested: (_: any, { workshopId }: any, context: any) => Promise<{
        message: string;
        workshop: {
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
        };
    }>;
    makeWorkshopNotInterested: (_: any, { workshopId }: any, context: any) => Promise<{
        message: string;
        workshop: {
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
        };
    }>;
};
//# sourceMappingURL=workshop-gql.d.ts.map