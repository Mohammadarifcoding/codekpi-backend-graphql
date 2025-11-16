"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const committee_gql_1 = require("../../modules/committee/committee-gql");
const profile_gql_1 = require("../../modules/profile/profile-gql");
const review_gql_1 = require("../../modules/review/review-gql");
const user_gql_1 = require("../../modules/user/user-gql");
const workshop_gql_1 = require("../../modules/workshop/workshop-gql");
exports.Mutation = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, user_gql_1.userMutationResolver), workshop_gql_1.workshopMutationResolver), profile_gql_1.profileMutationResolver), review_gql_1.reviewMutationResolver), committee_gql_1.committeeMutationResolver);
