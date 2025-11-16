export declare const resolvers: {
    Query: {
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
    Mutation: {
        createCommittee: (parent: any, args: any, context: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
        deleteCommittee: (parent: any, args: any, context: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
        updateCommittee: (parent: any, args: any, context: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
        createCommitteeMember: (parent: any, args: any, context: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
        createReview: (_: any, data: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
        updateStatus: (_: any, data: any, context: any) => Promise<{
            message: string;
            success: boolean;
        }>;
        deleteReview: (_: any, data: any) => Promise<import("../../constants/ApiResponse").ApiResponse>;
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
};
//# sourceMappingURL=index.d.ts.map