import { profileQueryResolver } from "../../modules/profile/profile-query";
import { reviewQueryResolver } from "../../modules/review/review-query";
import { userQueryResolver } from "../../modules/user/user-query";
import { workshopQueryResolver } from "../../modules/workshop/workshop-query";

export const Query = {
  ...userQueryResolver,
  ...workshopQueryResolver,
  ...profileQueryResolver,
  ...reviewQueryResolver,
};
