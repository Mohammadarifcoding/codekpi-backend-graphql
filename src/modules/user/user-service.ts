import { GraphQLError } from "graphql";
import prisma from "../../services/db";
import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";
import type { Prisma } from "@prisma/client";

const createUser = async ({ name, email, password }: any) => {
  return await prisma.$transaction(async (tx) => {
    await validateEmailAvailable(email);
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await tx.user.create({
      data: { name, email, password: hashPassword },
    });

    // Create profile
    await tx.profile.create({
      data: { userId: newUser.id },
    });

    const token = await jwtHelper.generateToken(
      newUser.id,
      process.env.JWT_SECRET as string
    );

    const { password: pass, ...userWithoutPassword } = newUser;

    return {
      message: "User created successfully",
      token,
      user: userWithoutPassword,
    };
  });
};
const signin = async ({ email, password }: any) => {
  const user = await findUserOrThrow({ email });
  await checkPassword({ user, password });
  const token = jwtHelper.generateToken(
    user.id,
    process.env.JWT_SECRET as string
  );
  const { password: pass, ...userWithoutPassword } = user;
  return {
    message: "Signin successful",
    token,
    user: userWithoutPassword,
  };
};

const deleteUser = async ({ userId }: { userId: string }) => {
  return await prisma.$transaction(async (tx) => {
    await findUserOrThrow({ userId });

    await tx.profile.deleteMany({
      where: { userId: userId },
    });
    const deleteUser = await tx.user.delete({
      where: { id: userId },
    });

    return {
      message: "User deleted successfully",
      user: deleteUser,
    };
  });
};
const updatePassword = async ({ userId, oldPassword, newPassword }: any) => {
  return await prisma.$transaction(async (tx) => {
    const findUser = await findUserOrThrow({ userId });
    await checkPassword({ user: findUser, password: oldPassword });
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await tx.user.update({
      where: { id: userId },
      data: {
        password: hashPassword,
      },
    });

    return {
      message: "Password updated successfully",
    };
  });
};

const getUsers = async () => {
  return await prisma.user.findMany({
    include: { profile: true },
  });
};

const findUserOrThrow = async ({
  userId,
  email,
}: {
  userId?: string;
  email?: string;
}) => {
  if (!userId && !email) {
    throw new GraphQLError("Internal server error", {
      extensions: { code: "INTERNAL_SERVER_ERROR" },
    });
  }

  const where: Prisma.UserWhereUniqueInput = userId
    ? { id: userId }
    : { email: email! };

  const user = await prisma.user.findUnique({ where });

  if (!user) {
    throw new GraphQLError("User not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }

  return user;
};

const checkPassword = async ({ user, password }: any) => {
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new GraphQLError("Invalid credentials", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return true;
};

const validateEmailAvailable = async (email: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new GraphQLError("Email already in use", {
      extensions: { code: "BAD_REQUEST" },
    });
  }
};

export const userService = {
  createUser,
  signin,
  deleteUser,
  updatePassword,
  getUsers,
  findUserOrThrow,
  checkPassword,
  validateEmailAvailable,
};
