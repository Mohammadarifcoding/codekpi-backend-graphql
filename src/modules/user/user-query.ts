import prisma from "../../services/db";

export const userQueryResolver = {
  users: async () => {
    return await prisma.user.findMany({
      include: { profile: true, interestedWorkshops: true },
    });
  },
};
