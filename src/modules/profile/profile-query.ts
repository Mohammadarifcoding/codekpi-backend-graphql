import prisma from "../../services/db";

export const profileQueryResolver = {
  profiles: async () => {
    return await prisma.profile.findMany({
      include: { user: true },
    });
  },
  getProfile: async (_: any, {}: any, context: any) => {
    const { user } = context;
    console.log(user, "from profile query");
    if (!user) {
      return {
        message: "Unauthorized",
      };
    }
    const profile = await prisma.user.findUnique({
      where: { id: user.userId },
      include: { profile: true, interestedWorkshops: true },
    });

    if (!profile) {
      return {
        message: "Profile not found",
      };
    }
    return {
      message: "Profile fetched successfully",
      user: profile,
    };
  },
};
