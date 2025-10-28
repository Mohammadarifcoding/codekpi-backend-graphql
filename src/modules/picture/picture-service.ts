import type { PrismaClient } from "@prisma/client";

const createPicture = async (
  image: string,
  tx: Omit<
    PrismaClient,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends"
  >
) => {
  const picture = await tx.picture.create({
    data: {
      image,
    },
  });
  return picture;
};

export const pictureService = {
  createPicture,
};
