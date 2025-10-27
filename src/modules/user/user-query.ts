import { userService } from "./user-service";

export const userQueryResolver = {
  users: async (args: any, data: any, context: any) => {
    return await userService.getUsers(data.skip, data.limit);
  },
};
