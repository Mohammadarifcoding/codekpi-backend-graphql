import type { Request, Response } from "express";
import userService from "./user-service";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAll();
  res.json(users);
};
