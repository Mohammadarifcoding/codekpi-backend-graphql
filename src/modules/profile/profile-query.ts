import { profileService } from "./profile-service";

export const profileQueryResolver = {
  profiles: async () => {
    return await profileService.getProfiles();
  },
  getProfile: async (_: any, {}: any, context: any) => {
    return await profileService.getMyProfile(context.user.userId);
  },
};
