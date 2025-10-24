import prisma from "../../services/db";

export const workshopMutationResolver = {
  createWorkshop: async (
    _: any,
    { title, content, image }: any,
    context: any
  ) => {
    console.log("Creating workshop with:", { title, content, image });
    const workshop = await prisma.workshop.create({
      data: { title, content, image },
    });
    return workshop;
  },
  updateWorkshop: async (
    _: any,
    { id, title, content, image }: any,
    context: any
  ) => {
    const workshop = await prisma.workshop.update({
      where: { id },
      data: { title, content, image },
    });

    return workshop;
  },

  deleteWorkshop: async (_: any, { id }: any, context: any) => {
    const workshop = await prisma.workshop.delete({
      where: { id },
    });
  },
  makeWorkshopInterested: async (_: any, { workshopId }: any, context: any) => {
    const { user } = context;
    if (!user) {
      return {
        message: "Unauthorized",
      };
    }
    const updateWorkshop = await prisma.workshop.update({
      where: { id: workshopId },
      data: {
        interestedUsers: {
          connect: { id: user.userId },
        },
      },
      include: {
        interestedUsers: true,
      },
    });
    return {
      message: "Workshop marked as interested ✅",
      workshop: updateWorkshop,
    };
  },
  makeWorkshopNotInterested: async (
    _: any,
    { workshopId }: any,
    context: any
  ) => {
    const { user } = context;
    if (!user) {
      return {
        message: "Unauthorized",
      };
    }
    const updateWorkshop = await prisma.workshop.update({
      where: { id: workshopId },
      data: {
        interestedUsers: {
          disconnect: { id: user.userId },
        },
      },
      include: {
        interestedUsers: true,
      },
    });
    return {
      message: "Workshop removed from interested ✅",
      workshop: updateWorkshop,
    };
  },
};
