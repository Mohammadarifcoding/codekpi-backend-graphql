import prisma from "../../services/db";
import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";

export const userMutationResolver = {
  createUser: async (_: any, { name, email, password }: any) => {
    return await prisma.$transaction(async (tx) => {
      const findUser = await tx.user.findFirst({ where: { email } });
      if (findUser) {
        return {
          message: "User already exists",
        };
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashPassword,
        },
      });
      const token = jwtHelper.generateToken(
        newUser.id,
        process.env.JWT_SECRET as string
      );
      await tx.profile.create({
        data: {
          userId: newUser.id,
        },
      });
      const { password: pass, ...userWithoutPassword } = newUser;
      return {
        message: "User created successfully",
        token,
        user: userWithoutPassword,
      };
    });
  },
  signin: async (_: any, { email, password }: any) => {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return {
        message: "User not found",
      };
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return {
        message: "Invalid password",
      };
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
  },
  deleteUser: async (_: any, data: any, context: any) => {
    const { user } = context;

    return await prisma.$transaction(async (tx) => {
      if (!user) throw new Error("Unauthorized");

      const findUser = await tx.user.findUnique({
        where: { id: user.userId },
        include: { profile: true },
      });

      if (!findUser) throw new Error("User not found");

      // Delete the dependent record first
      await tx.profile.deleteMany({
        where: { userId: user.userId },
      });
      // Then delete the user
      await tx.user.delete({
        where: { id: user.userId },
      });

      return {
        message: "User deleted successfully",
        user: findUser,
      };
    });
  },
};
