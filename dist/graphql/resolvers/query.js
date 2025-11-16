"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const committee_gql_1 = require("../../modules/committee/committee-gql");
const profile_gql_1 = require("../../modules/profile/profile-gql");
const review_gql_1 = require("../../modules/review/review-gql");
const user_gql_1 = require("../../modules/user/user-gql");
const workshop_gql_1 = require("../../modules/workshop/workshop-gql");
exports.Query = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, user_gql_1.userQueryResolver), workshop_gql_1.workshopQueryResolver), profile_gql_1.profileQueryResolver), review_gql_1.reviewQueryResolver), committee_gql_1.committeeQueryResolver);
