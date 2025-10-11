import prisma from "../../services/db";

export const userMutationResolver = {
  users: async (name: string, email: string) => {
    return await prisma.user.create({ data: { name, email } });
  },
};
