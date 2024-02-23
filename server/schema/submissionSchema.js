const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Submission {
    _id: ID!
    user_id: ID!
    problem_name: String!
    verdict: Boolean!
  }

  type Query {
    allSubmissions: [Submission!]!
  }

  type Mutation {
    submit(user_id: ID!, problem_name: String!, verdict: Boolean!): String
  }
`;

module.exports = typeDefs;
