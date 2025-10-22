import { profileMutationResolver } from "../../modules/profile/profile-mutation";
import { userMutationResolver } from "../../modules/user/user-mutation";
import { workshopMutationResolver } from "../../modules/workshop/workshop-mutation";

export const Mutation = {
  ...userMutationResolver,
  ...workshopMutationResolver,
  ...profileMutationResolver,
};
