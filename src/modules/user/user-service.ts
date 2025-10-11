import prisma from "../../services/db";

const getAll = async () => {
  return await prisma.user.findMany();
};

export default { getAll };
