import { GraphQLError } from "graphql";
import prisma from "../../services/db";
import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";
import type { Prisma } from "@prisma/client";
import { authorization } from "../../utils/authorization";
import { generateOTP, sendVerificationEmail } from "../../utils/otp";
import jwt from "jsonwebtoken";

const createUser = async ({ name, email, password }: any, { res }: any) => {
  return await prisma.$transaction(async (tx) => {
    await validateEmailAvailable(email);
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await tx.user.create({
      data: { name, email, password: hashPassword },
    });

    // // Create profile
    // await tx.profile.create({
    //   data: { userId: newUser.id },
    // });

    const token = await jwtHelper.generateToken(
      newUser.id,
      process.env.JWT_SECRET as string
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    const { password: pass, ...userWithoutPassword } = newUser;

    return {
      message: "User created successfully",
      token,
      user: userWithoutPassword,
    };
  });
};
const signin = async ({ email, password }: any, { res }: any) => {
  const user = await findUserOrThrow({ email });
  await checkPassword({ user, password });
  const token = await jwtHelper.generateToken(
    user.id,
    process.env.JWT_SECRET as string
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  const { password: pass, ...userWithoutPassword } = user;
  return {
    message: "Signin successful",
    token,
    user: userWithoutPassword,
  };
};

const deleteUser = async (
  {
    userId,
    deleteId,
  }: {
    userId: string;
    deleteId: string;
  },
  { res }: any
) => {
  return await prisma.$transaction(async (tx) => {
    const user = await findUserOrThrow({ userId });
    if (user.id !== deleteId) authorization.requireAdmin(user);

    await findUserOrThrow({ userId: deleteId, message: "User not found" });
    await tx.profile.deleteMany({
      where: { userId: deleteId },
    });
    const deleteUser = await tx.user.delete({
      where: { id: deleteId },
    });
    if (user.id === deleteId) res.clearCookie("token");
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

const getUsers = async (
  page: number = 1,
  limit: number = 10,
  userId: string
) => {
  const user = await findUserOrThrow({ userId: userId });
  authorization.requireAdmin(user);
  const skip = (page - 1) * limit;
  const data = await prisma.user.findMany({
    include: { profile: true },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return {
    message: "Users fetched successfully ✅",
    data: data,
    page: page,
    limit: limit,
    total: await prisma.user.count(),
  };
};

const createOTP = async ({ email }: any) => {
  await findUserOrThrow({ email });
  const otp = generateOTP();
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await prisma.otp.create({
    data: { email, otp_hash: otpHash, expires_at: expiresAt },
  });
  await sendVerificationEmail(email, otp);
  return {
    message: "OTP sent successfully",
    success: true,
  };
};

const verifyOTP = async ({ email, code }: { email: string; code: string }) => {
  const otpData = await prisma.otp.findFirst({
    where: { email: email, used: false },
    orderBy: { createdAt: "desc" },
  });
  if (!otpData) {
    throw new GraphQLError("OTP not found", {
      extensions: { code: "NOT_FOUND" },
    });
  }
  if (otpData.expires_at < new Date()) {
    throw new GraphQLError("OTP expired", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  const compareOTP = await bcrypt.compare(code, otpData?.otp_hash);
  if (!compareOTP) {
    throw new GraphQLError("Invalid OTP", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  await prisma.otp.update({ where: { id: otpData.id }, data: { used: true } });
  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "10m",
  });
  return {
    message: "OTP verified successfully",
    success: true,
    verified: true,
    resetToken,
  };
};
const changePassword = async ({ token, newPassword }: any) => {
  try {
    const { email } = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
    };
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashed },
    });

    return { message: "Password changed successfully", success: true };
  } catch (err) {
    throw new GraphQLError("Invalid or expired token", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
};
const findUserOrThrow = async ({
  userId,
  email,
  message,
}: {
  userId?: string;
  email?: string;
  message?: string;
}) => {
  if (!userId && !email) {
    throw new GraphQLError(
      message || "Authentication failed: user not found in context",
      {
        extensions: { code: "UNAUTHENTICATED" },
      }
    );
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
  createOTP,
  verifyOTP,
  changePassword,
};
