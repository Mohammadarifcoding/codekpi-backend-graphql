import { profileService } from "./profile-service";

export const profileMutationResolver = {
  updateProfile: async (_: any, data: any, context: any) => {
    return await profileService.updateProfile(context.user.userId, data);
  },
};
