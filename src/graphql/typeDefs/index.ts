import { gql } from "apollo-server-express"; // Or "@apollo/server"

export const typeDefs = gql`
  scalar DateTime
  interface BaseResponse {
    message: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: DateTime!
    profile: Profile
    interestedWorkshops: [Workshop!]!
  }

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

  type Profile {
    id: ID!
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
    createdAt: DateTime!
  }

  type Workshop {
    id: ID!
    title: String!
    content: String!
    image: String!
    interestedUsers: [User!]!
    createdAt: DateTime!
  }

  type ProfilePayload implements BaseResponse {
    message: String!
    user: User
  }

  type Query {
    users: [User!]!
    workshops: [Workshop!]!
    getProfile: ProfilePayload!
    profiles: [Profile!]!
  }

  type UserPayload implements BaseResponse {
    message: String!
    token: String
    user: User
  }

  type Message implements BaseResponse {
    message: String!
  }

  type WorkshopResponse implements BaseResponse {
    message: String!
    workshop: Workshop
  }

  input CreateWorkshopInput {
    title: String!
    content: String!
    image: String!
  }

  input UpdateWorkshopInput {
    title: String
    content: String
    image: String
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
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): UserPayload!
    createWorkshop(input: CreateWorkshopInput!): Workshop!
    updateWorkshop(id: ID!, input: UpdateWorkshopInput): Workshop!
    deleteWorkshop(id: ID!): Workshop!
    signin(email: String!, password: String!): UserPayload!
    updateProfile(input: UpdateProfileInput!): ProfilePayload!
    deleteUser: UserPayload!
    updatePassword(oldPassword: String!, newPassword: String!): Message!
    makeWorkshopInterested(workshopId: String!): WorkshopResponse!
    makeWorkshopNotInterested(workshopId: String!): WorkshopResponse!
  }
`;
