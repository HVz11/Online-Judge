const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Problem {
    _id: ID!
    statement: String!
    name: String!
    code: String!
    difficulty: String!
    testCases: [TestCase!]!
  }

  type TestCase {
    input: String!
    expectedOutput: String!
  }

  type Query {
    allProblems: [Problem!]!
    getProblemById(id: ID!): Problem
  } 

  type Mutation {
    addProblem(
      statement: String!
      name: String!
      code: String!
      difficulty: String!
    ): String
    addTestCases(probid: ID!, input: String!, expectedOutput: String!): Problem
    submit(lang: String!, code: String!, probid: ID!, user_id: ID!): String
    run(lang: String!, code: String!, user_input: String!): String
  }
`;

module.exports = typeDefs;
