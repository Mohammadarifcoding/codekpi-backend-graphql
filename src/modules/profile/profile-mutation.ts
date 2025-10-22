import prisma from "../../services/db";

export const profileMutationResolver = {
  updateProfile: async (_: any, data: any, context: any) => {
    const { user } = context;
    if (!user) {
      return {
        message: "Unauthorized",
      };
    }

    const find = await prisma.profile.findUnique({
      where: { userId: user.userId },
    });
    if (!find) {
      return {
        message: "Profile not found",
      };
    }
    const updateProfile = await prisma.profile.update({
      where: { userId: user.userId },
      data: { ...data },
      include: { user: true },
    });
    console.log(updateProfile, data, "updated profile");
    return {
      message: "Profile updated successfully",
      profile: updateProfile,
      user: updateProfile.user,
    };
  },
};
