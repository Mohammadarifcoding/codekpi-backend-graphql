import prisma from "../../services/db";
import { userService } from "./user-service";

export const userQueryResolver = {
  users: async () => {
    return await userService.getUsers();
  },
};
