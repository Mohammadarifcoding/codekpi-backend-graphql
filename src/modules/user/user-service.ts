import { GraphQLError } from "graphql";
import prisma from "../../services/db";
import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";

const createUser = async ({ name, email, password }: any) => {
  return await prisma.$transaction(async (tx) => {
    const findUser = await tx.user.findFirst({ where: { email } });
    if (findUser) {
      // Throw real errors (see next point)
      throw new GraphQLError("User already exists", {
        extensions: { code: "BAD_REQUEST" },
      });
    }
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
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw new GraphQLError("User not found", {
      extensions: { code: "BAD_REQUEST" },
    });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new GraphQLError("Invalid password", {
      extensions: { code: "BAD_REQUEST" },
    });
  }
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
    const findUser = await tx.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!findUser) {
      throw new GraphQLError("User not found", {
        extensions: { code: "BAD_REQUEST" },
      });
    }

    await tx.profile.deleteMany({
      where: { userId: userId },
    });
    await tx.user.delete({
      where: { id: userId },
    });

    return {
      message: "User deleted successfully",
      user: findUser,
    };
  });
};
const updatePassword = async ({ userId, oldPassword, newPassword }: any) => {
  return await prisma.$transaction(async (tx) => {
    const findUser = await tx.user.findUnique({
      where: { id: userId },
    });
    if (!findUser) {
      throw new GraphQLError("User not found", {
        extensions: { code: "BAD_REQUEST" },
      });
    }
    const comparePassword = await bcrypt.compare(
      oldPassword,
      findUser.password
    );
    if (!comparePassword) {
      throw new GraphQLError("Invalid Password", {
        extensions: { code: "BAD_REQUEST" },
      });
    }
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

export const userService = {
  createUser,
  signin,
  deleteUser,
  updatePassword,
  getUsers,
};
