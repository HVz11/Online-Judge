const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Problem {
    _id: ID!
    title: String!
    description: String!
  }

  type Submission {
    _id: ID!
    userId: ID!
    problemId: ID!
    code: String!
    status: String!
  }
  type Query {
    getUserById(userId: ID!): User
    getProblemById(problemId: ID!): Problem
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createProblem(title: String!, description: String!): Problem
    submitCode(userId: ID!, problemId: ID!, code: String!): Submission
  }
`;

module.exports = typeDefs;
