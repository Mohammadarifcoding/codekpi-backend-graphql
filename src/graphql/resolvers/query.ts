import { profileQueryResolver } from "../../modules/profile/profile-gql";
import { reviewQueryResolver } from "../../modules/review/review-gql";
import { userQueryResolver } from "../../modules/user/user-gql";
import { workshopQueryResolver } from "../../modules/workshop/workshop-gql";

export const Query = {
  ...userQueryResolver,
  ...workshopQueryResolver,
  ...profileQueryResolver,
  ...reviewQueryResolver,
};
