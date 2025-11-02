import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar DateTime

  interface BaseResponse {
    message: String!
  }

  # =====================
  # ENUMS
  # =====================
  enum Session {
    SESSION_18_19
    SESSION_19_20
    SESSION_20_21
    SESSION_21_22
    SESSION_22_23
    SESSION_23_24
    SESSION_24_25
  }

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
    profile: Profile
    interestedWorkshops: [Workshop!]!
  }

  type Profile {
    id: ID!
    avatar: Picture
    bio: String
    userId: String!
    user: User!
    session: Session
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
    session: Session
    shift: Shift
    createdAt: DateTime!
  }
  type OTP {
    id: ID!
    email: String!
    used: Boolean!
    expires_at: String!
    createdAt: String!
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
    session: Session
    shift: Shift
    gender: Gender
    department: Department
    phone: String
    roll: String
    polytechnic: String
    avatar: String # user uploads image string
  }

  input CreateReviewInput {
    name: String!
    text: String!
    rating: Int!
    department: Department!
    session: Session!
    shift: Shift!
    userImage: String! # user uploads image string
  }

  # =====================
  # QUERIES
  # =====================

  type Query {
    users(page: Int, limit: Int): UsersResponse!
    profiles: [Profile!]!
    workshops: AllWorkshopResponse!
    reviews(page: Int!, limit: Int!): [Review!]!
    getProfile: Profile!
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

    createReview(input: CreateReviewInput!): Review!
    updateStatus(id: ID!, status: Status!): Review!
    deleteReview(id: ID!): Review!
  }
`;
