const Submission = require("../models/Submission");

const resolvers = {
  Query: {
    allSubmissions: async () => {
      try {
        const submissions = await Submission.find();
        return submissions;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    submit: async (_, { user_id, problem_name, verdict }) => {
      try {
        const newSubmission = new SubmissionSchema({
          user_id,
          problem_name,
          verdict,
        });
        await newSubmission.save();
        return "Submission added successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = resolvers;
