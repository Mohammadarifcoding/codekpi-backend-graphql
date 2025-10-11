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

  type Query {
    users: [User!]!
  }

  type Mutation {
    users(name: String!, email: String!): User!
  }
`;
