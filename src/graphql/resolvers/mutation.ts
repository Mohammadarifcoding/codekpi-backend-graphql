import { committeeMutationResolver } from "../../modules/committee/committee-gql";
import { profileMutationResolver } from "../../modules/profile/profile-gql";
import { reviewMutationResolver } from "../../modules/review/review-gql";
import { userMutationResolver } from "../../modules/user/user-gql";
import { workshopMutationResolver } from "../../modules/workshop/workshop-gql";

export const Mutation = {
  ...userMutationResolver,
  ...workshopMutationResolver,
  ...profileMutationResolver,
  ...reviewMutationResolver,
  ...committeeMutationResolver,
};
