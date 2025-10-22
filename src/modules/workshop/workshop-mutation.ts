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
};
