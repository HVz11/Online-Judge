const problem = require("../models/Problem");
// const Submission = require("../models/Submission");

const resolvers = {
  Query: {
    allProblems: async () => {
      try {
        const problems = await problem.find();
        return problems;
      } catch (err) {
        throw new Error(err);
      }
    },
    getProblemById: async (_, { id }) => {
      try {
        const problem = await problem.findById(id);
        return problem;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addProblem: async (_, { statement, name, code, difficulty }) => {
      try {
        const problem = new ProblemsSchema({
          statement,
          name,
          code,
          difficulty,
        });
        await problem.save();
        return "Problem added successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
    addTestCases: async (_, { probid, input, expectedOutput }) => {
      try {
        const problem = await Problem.findById(probid);
        if (!problem) {
          throw new Error("Problem not found");
        }
        problem.testCases.push({ input, expectedOutput });
        await problem.save();
        return problem;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = resolvers;
