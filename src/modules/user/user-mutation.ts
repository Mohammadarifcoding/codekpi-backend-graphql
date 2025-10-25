import { userService } from "./user-service";

export const userMutationResolver = {
  createUser: async (_: any, { name, email, password }: any) => {
    return await userService.createUser({ name, email, password });
  },
  signin: async (_: any, { email, password }: any) => {
    return await userService.signin({ email, password });
  },
  deleteUser: async (_: any, data: any, context: any) => {
    return await userService.deleteUser({ userId: context.user.userId });
  },
  updatePassword: async (
    _: any,
    { oldPassword, newPassword }: any,
    context: any
  ) => {
    return await userService.updatePassword({
      userId: context.user.userId,
      oldPassword,
      newPassword,
    });
  },
};
