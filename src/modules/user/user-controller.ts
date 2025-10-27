import type { Request, Response } from "express";
import { userService } from "./user-service";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers(req.body.skip, req.body.limit);
  res.json(users);
};
