const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    message: String
    tag: Boolean
  }
`;

module.exports = typeDefs;
