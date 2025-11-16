type UpdateWorkshopInput = {
    id: string;
    input: {
        title?: string;
        content?: string;
        banner?: string;
    };
};
export declare const updateWorkshop: ({ id, input }: UpdateWorkshopInput) => Promise<{
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
export declare const workshopService: {
    createWorkshop: ({ title, content, banner, }: {
        title: string;
        content: string;
        banner: string;
    }) => Promise<{
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
    updateWorkshop: ({ id, input }: UpdateWorkshopInput) => Promise<{
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
    deleteWorkshop: ({ id }: {
        id: string;
    }) => Promise<{
        message: string;
        workshop: {
            id: string;
            createdAt: Date;
            title: string;
            content: string;
            bannerId: string | null;
        };
    }>;
    makeWorkshopInterested: ({ workshopId, userId, }: {
        workshopId: string;
        userId: string;
    }) => Promise<{
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
    makeWorkshopNotInterested: ({ workshopId, userId, }: {
        workshopId: string;
        userId: string;
    }) => Promise<{
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
    findWorkshopOrThrow: ({ workshopId }: {
        workshopId?: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        bannerId: string | null;
    }>;
    getAllWorkshop: () => Promise<{
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
export {};
//# sourceMappingURL=workshop-service.d.ts.map