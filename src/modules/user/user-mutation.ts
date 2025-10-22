import prisma from "../../services/db";
import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";

export const userMutationResolver = {
  createUser: async (_: any, { name, email, password }: any) => {
    return await prisma.$transaction(async (tx) => {
      const findUser = await tx.user.findFirst({ where: { email } });
      if (!findUser) {
        return {
          message: "User already exists",
          token: null,
          user: null,
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
        token: null,
        user: null,
      };
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return {
        message: "Invalid password",
        token: null,
        user: null,
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
};
