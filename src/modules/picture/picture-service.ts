import type { PrismaClient } from "@prisma/client";
import prisma from "../../services/db";

const createPicture = async (
  image: string,
  tx: Omit<
    PrismaClient,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends"
  >
) => {
  const picture = await tx.picture.create({
    data: {
      image: image,
    },
  });
  return picture;
};

export const pictureService = {
  createPicture,
};
