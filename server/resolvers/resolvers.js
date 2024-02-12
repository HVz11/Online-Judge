const User = require("../models/User");
const Problem = require("../models/Problem");
const Submission = require("../models/Submission");

const resolvers = {
  Query: {
    getUserById: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
    getProblemById: async (_, { problemId }) => {
      try {
        const problem = await Problem.findById(problemId);
        return problem;
      } catch (error) {
        throw new Error("Failed to fetch problem");
      }
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const user = new User({ username, email, password });
        await user.save();
        return user;
      } catch (error) {
        throw new Error("Failed to create user");
      }
    },
    createProblem: async (_, { title, description }) => {
      try {
        const problem = new Problem({ title, description });
        await problem.save();
        return problem;
      } catch (error) {
        throw new Error("Failed to create problem");
      }
    },
    submitCode: async (_, { userId, problemId, code }) => {
      try {
        const submission = new Submission({ userId, problemId, code });
        // Implement submission logic (e.g., test code against problem constraints)
        submission.status = "Pending"; // For demonstration
        await submission.save();
        return submission;
      } catch (error) {
        throw new Error("Failed to submit code");
      }
    },
  },
};

module.exports = resolvers;
