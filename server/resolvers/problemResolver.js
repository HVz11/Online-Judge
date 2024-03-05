const Problem = require("../models/Problem");

const resolvers = {
  Query: {
    allProblems: async () => {
      try {
        const problems = await Problem.find();
        return problems;
      } catch (err) {
        throw new Error(err);
      }
    },
    getProblemById: async (_, { id }) => {
      try {
        const foundProblem = await Problem.findById(id);
        return foundProblem;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addProblem: async (_, { statement, name, code, difficulty }) => {
      try {
        const newProblem = new Problem({
          statement,
          name,
          code,
          difficulty,
        });
        await newProblem.save();
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
