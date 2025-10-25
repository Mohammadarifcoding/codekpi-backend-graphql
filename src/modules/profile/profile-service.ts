import { GraphQLError } from "graphql";
import prisma from "../../services/db";

const getProfiles = async () => {
  return await prisma.profile.findMany({
    include: { user: true },
  });
};

const getMyProfile = async (userId: string) => {
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true, interestedWorkshops: true },
  });

  if (!profile) {
    throw new GraphQLError("Profile Not found", {
      extensions: { code: "BAD_REQUEST" },
    });
  }
  return {
    message: "Profile fetched successfully",
    user: profile,
  };
};

const updateProfile = async (userId: string, data: any) => {
  const find = await prisma.profile.findUnique({
    where: { userId: userId },
  });
  if (!find) {
    throw new GraphQLError("Profile Not found", {
      extensions: { code: "BAD_REQUEST" },
    });
  }
  const updateProfile = await prisma.profile.update({
    where: { userId: userId },
    data: { ...data },
    include: { user: true },
  });
  return {
    message: "Profile updated successfully",
    user: updateProfile,
  };
};

export const profileService = {
  getProfiles,
  getMyProfile,
  updateProfile,
};
