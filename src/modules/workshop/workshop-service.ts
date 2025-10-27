import { GraphQLError } from "graphql";
import prisma from "../../services/db";
import { userService } from "../user/user-service";
import type { Prisma } from "@prisma/client";
import { pictureService } from "../picture/picture-service";

const createWorkshop = async ({
  title,
  content,
  banner,
}: {
  title: string;
  content: string;
  banner: string;
}) => {
  return await prisma.$transaction(async (tx) => {
    const picture = await pictureService.createPicture(banner, tx);
    const newWorkshop = await tx.workshop.create({
      data: {
        title,
        content,
        banner: { connect: { id: picture.id } },
      },
    });
    return {
      message: "Workshop created successfully ✅",
      workshop: newWorkshop,
    };
  });
};

type UpdateWorkshopInput = {
  id: string;
  title?: string;
  content?: string;
  banner?: string;
};

export const updateWorkshop = async ({
  id,
  title,
  content,
  banner,
}: UpdateWorkshopInput) => {
  return await prisma.$transaction(async (tx) => {
    await findWorkshopOrThrow({ workshopId: id });
    const data: Prisma.WorkshopUpdateInput = {};
    if (title) data.title = title;
    if (content) data.content = content;

    if (banner) {
      const picture = await pictureService.createPicture(banner, tx);
      data.banner = { connect: { id: picture.id } };
    }

    const updatedWorkshop = await tx.workshop.update({
      where: { id },
      data,
    });

    return {
      message: "Workshop updated successfully ✅",
      workshop: updatedWorkshop,
    };
  });
};

const deleteWorkshop = async ({ id }: { id: string }) => {
  return await prisma.$transaction(async (tx) => {
    await findWorkshopOrThrow({ workshopId: id });

    const deletedWorkshop = await tx.workshop.delete({
      where: { id },
    });

    return {
      message: "Workshop deleted successfully ✅",
      workshop: deletedWorkshop,
    };
  });
};

const makeWorkshopInterested = async ({
  workshopId,
  userId,
}: {
  workshopId: string;
  userId: string;
}) => {
  return await prisma.$transaction(async (tx) => {
    const user = await userService.findUserOrThrow({ userId });
    await findWorkshopOrThrow({ workshopId });

    const updatedWorkshop = await tx.workshop.update({
      where: { id: workshopId },
      data: {
        interestedUsers: {
          connect: { id: user.id },
        },
      },
      include: { interestedUsers: true },
    });

    return {
      message: "Workshop marked as interested ✅",
      workshop: updatedWorkshop,
    };
  });
};

const makeWorkshopNotInterested = async ({
  workshopId,
  userId,
}: {
  workshopId: string;
  userId: string;
}) => {
  return await prisma.$transaction(async (tx) => {
    const user = await userService.findUserOrThrow({ userId });
    await findWorkshopOrThrow({ workshopId });

    const updatedWorkshop = await tx.workshop.update({
      where: { id: workshopId },
      data: {
        interestedUsers: {
          disconnect: { id: user.id },
        },
      },
      include: { interestedUsers: true },
    });

    return {
      message: "Workshop removed from interested ✅",
      workshop: updatedWorkshop,
    };
  });
};

const findWorkshopOrThrow = async ({ workshopId }: { workshopId?: string }) => {
  if (!workshopId) {
    throw new GraphQLError("Internal server error", {
      extensions: { code: "INTERNAL_SERVER_ERROR" },
    });
  }

  const workshop = await prisma.workshop.findUnique({
    where: { id: workshopId },
  });

  if (!workshop) {
    throw new GraphQLError("Workshop not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }

  return workshop;
};

const getAllWorkshop = async () => {
  const workshops = await prisma.workshop.findMany({
    include: { interestedUsers: true },
  });
  return {
    message: "Workshop fetched successfully ✅",
    workshop: workshops,
  };
};

export const workshopService = {
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  makeWorkshopInterested,
  makeWorkshopNotInterested,
  findWorkshopOrThrow,
  getAllWorkshop,
};
