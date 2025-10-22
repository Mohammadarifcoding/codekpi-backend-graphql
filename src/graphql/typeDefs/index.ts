import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
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
    createdAt: String!
  }

  type Workshop {
    id: ID!
    title: String!
    content: String!
    image: String!
  }
  type ProfilePayload {
    message: String
    profile: Profile
    user: User
  }
  type Query {
    users: [User!]!
    workshops: [Workshop!]!
    getProfile: ProfilePayload!
    profiles: [Profile!]!
  }

  type UserPayload {
    message: String
    token: String
    user: User
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): UserPayload!
    createWorkshop(title: String!, content: String!, image: String!): Workshop!
    updateWorkshop(
      id: ID!
      title: String
      content: String
      image: String
    ): Workshop!
    deleteWorkshop(id: ID!): Workshop!
    signin(email: String!, password: String!): UserPayload!
    updateProfile(
      bio: String
      session: Session
      shift: Shift
      gender: Gender
      department: Department
      phone: String
      roll: String
      polytechnic: String
    ): ProfilePayload!
  }
`;
