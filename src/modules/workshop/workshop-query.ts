import prisma from "../../services/db";

export const workshopQueryResolver = {
  workshops: async () => {
    return await prisma.workshop.findMany();
  },
};
