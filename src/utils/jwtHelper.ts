import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const generateToken = async (userId: string, secret: string) => {
  const token = jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });
  return token;
};

const verifyToken = async (token: string, secret: string) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded as { userId: string };
  } catch (error) {
    return null;
  }
};

export const jwtHelper = {
  generateToken,
  verifyToken,
  getUserInfoFromToken,
};
