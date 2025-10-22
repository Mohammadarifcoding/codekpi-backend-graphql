import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
  }

  type Profile {
    id: ID!
    bio: String
    user: User!
    createdAt: String!
  }

  type Workshop {
    id: ID!
    title: String!
    content: String!
    image: String!
  }

  type Query {
    users: [User!]!
    workshops: [Workshop!]!
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
  }
`;
