import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateTime

  interface BaseResponse {
    message: String!
  }

  # =====================
  # ENUMS
  # =====================
  enum Department {
    COMPUTER
    CIVIL
    ELECTRICAL
    MECHANICAL
    ELECTRONICS
    POWER
    AUTOMOBILE
    RAC
    OTHER
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }

  enum Shift {
    MORNING
    EVENING
  }

  enum Status {
    PENDING
    APPROVED
  }

  enum CommitteeRole {
    PRESIDENT
    VICE_PRESIDENT
    GENERAL_SECRETARY
    JOINT_GENERAL_SECRETARY
    FINANCE_SECRETARY
    OFFICE_SECRETARY
    MEDIA_SECRETARY
    COMMUNICATION_SECRETARY
    PUBLICITY_SECRETARY
    MENTOR
    ADVISOR
    REPRESENTATIVE
  }

  # =====================
  # CORE MODELS
  # =====================

  type Picture {
    id: ID!
    image: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: DateTime!
    avatar: Picture
    profile: Profile
    interestedWorkshops: [Workshop!]!
  }

  type Profile {
    id: ID!
    bio: String
    userId: String!
    user: User!
    session: String
    shift: Shift
    gender: Gender
    department: Department
    phone: String
    roll: String
    polytechnic: String
  }

  type Workshop {
    id: ID!
    title: String!
    content: String!
    banner: Picture
    createdAt: DateTime!
    interestedUsers: [User!]!
  }

  type Review {
    id: ID!
    userImage: Picture
    name: String!
    text: String!
    rating: Int!
    status: Status
    department: Department
    session: String
    shift: Shift
    createdAt: DateTime!
  }

  type Otp {
    id: ID!
    email: String!
    used: Boolean!
    expires_at: String!
    createdAt: DateTime!
  }
  type Committee {
    id: ID!
    name: String!
    year: Int!
    members: [CommitteeMember!]
    createdAt: DateTime!
  }

  type CommitteeMember {
    id: ID!
    committee: Committee!
    role: CommitteeRole!
    name: String!
    email: String!
    department: Department
    session: String!
    speciality: String!
    memberPicture: Picture
    phone: String
    positionOrder: Int
    year: Int!
    createdAt: DateTime!
  }

  # =====================
  # PAYLOAD TYPES
  # =====================

  type UserPayload implements BaseResponse {
    message: String!
    token: String
    user: User
  }

  type ProfilePayload implements BaseResponse {
    message: String!
    profile: Profile
  }

  type WorkshopResponse implements BaseResponse {
    message: String!
    workshop: Workshop
  }
  type AllWorkshopResponse implements BaseResponse {
    message: String!
    workshops: [Workshop!]!
  }
  type Message implements BaseResponse {
    message: String!
  }

  type SuccessMessage implements BaseResponse {
    message: String!
    success: Boolean
  }

  type UsersResponse {
    message: String!
    data: [User!]!
    page: Int!
    limit: Int!
    total: Int!
  }
  type ReviewsResponse {
    message: String!
    success: Boolean!
    data: [Review!]
    page: Int
    limit: Int
    total: Int!
  }
  type CreateOTPResponse {
    success: Boolean!
    message: String!
  }

  type VerifyOTPResponse {
    success: Boolean!
    message: String!
    verified: Boolean
    resetToken: String
  }
  type ReviewResponse {
    message: String!
    data: Review
    success: Boolean!
  }

  type CommitteeResponse implements BaseResponse {
    message: String!
    success: Boolean!
    data: Committee
  }

  type CommitteeMemberResponse implements BaseResponse {
    message: String!
    data: CommitteeMember
  }
  type CommitteeMembersResponse implements BaseResponse {
    message: String!
    data: [CommitteeMember!]!
  }
  type AllCommitteePayload implements BaseResponse {
    message: String!
    success: Boolean!
    data: [Committee!]!
  }

  # =====================
  # INPUT TYPES
  # =====================

  input CreateWorkshopInput {
    title: String!
    content: String!
    banner: String!
  }

  input UpdateWorkshopInput {
    title: String
    content: String
    banner: String
  }

  input UpdateProfileInput {
    bio: String
    session: String
    shift: Shift
    gender: Gender
    department: Department
    phone: String
    roll: String
    polytechnic: String
    avatar: String
  }

  input CreateReviewInput {
    name: String!
    text: String!
    rating: Int!
    department: Department!
    session: String!
    shift: Shift!
    userImage: String! # user uploads image string
  }

  input CreateCommitteeInput {
    name: String!
    year: Int!
  }

  input UpdateCommitteeInput {
    name: String
    year: Int
  }

  input CreateCommitteeMemberInput {
    committeeId: ID!
    role: CommitteeRole!
    name: String!
    email: String!
    department: Department!
    session: String!
    speciality: String!
    memberPicture: String
    phone: String!
    positionOrder: Int
    year: Int!
  }

  input UpdateCommitteeMemberInput {
    role: CommitteeRole
    name: String
    email: String
    department: Department
    session: String
    speciality: String
    memberPicture: String
    phone: String
    positionOrder: Int
    year: Int
  }
  # =====================
  # QUERIES
  # =====================

  type Query {
    users(page: Int, limit: Int): UsersResponse!
    profiles: [Profile!]!
    workshops: AllWorkshopResponse!
    reviews(page: Int, limit: Int): ReviewsResponse!
    getProfile: Profile!
    allCommittees: AllCommitteePayload!
    committee(id: ID!): CommitteeResponse
    committeeMembers(committeeId: ID!): CommitteeMembersResponse
    committeeMember(id: ID!): CommitteeMemberResponse
  }

  # =====================
  # MUTATIONS
  # =====================

  type Mutation {
    createUser(name: String!, email: String!, password: String!): UserPayload!
    signin(email: String!, password: String!): UserPayload!
    deleteUser(userId: String!): UserPayload!
    updatePassword(oldPassword: String!, newPassword: String!): Message!
    createOTP(email: String!): CreateOTPResponse!
    verifyOTP(email: String!, code: String!): VerifyOTPResponse!
    changePassword(token: String!, newPassword: String!): SuccessMessage!

    updateProfile(input: UpdateProfileInput!): ProfilePayload!

    createWorkshop(input: CreateWorkshopInput!): WorkshopResponse!
    updateWorkshop(id: ID!, input: UpdateWorkshopInput!): WorkshopResponse!
    deleteWorkshop(id: ID!): WorkshopResponse!
    makeWorkshopInterested(workshopId: String!): WorkshopResponse!
    makeWorkshopNotInterested(workshopId: String!): WorkshopResponse!

    createReview(input: CreateReviewInput!): ReviewResponse!
    updateStatus(id: ID!, status: Status!): ReviewResponse!
    deleteReview(id: ID!): ReviewResponse!

    createCommittee(input: CreateCommitteeInput!): CommitteeResponse!
    updateCommittee(id: ID!, input: UpdateCommitteeInput!): CommitteeResponse!
    deleteCommittee(id: ID!): CommitteeResponse!

    createCommitteeMember(
      input: CreateCommitteeMemberInput!
    ): CommitteeMemberResponse!
    updateCommitteeMember(
      id: ID!
      input: UpdateCommitteeMemberInput!
    ): CommitteeMemberResponse!
    deleteCommitteeMember(id: ID!): SuccessMessage!
  }
`;
