import prisma from "../../services/db";

export const profileQueryResolver = {
  profiles: async () => {
    return await prisma.profile.findMany();
  },
  getProfile: async (_: any, {}: any, context: any) => {
    const { user } = context;
    console.log(user, "from profile query");
    if (!user) {
      return {
        message: "Unauthorized",
      };
    }
    const profile = await prisma.profile.findUnique({
      where: { userId: user.userId },
      include: { user: true },
    });

    if (!profile) {
      return {
        message: "Profile not found",
      };
    }
    return {
      message: "Profile fetched successfully",
      profile,
    };
  },
};
