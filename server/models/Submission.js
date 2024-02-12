const mongoose = require("mongoose");
// const User = require("./user");

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  problemName: {
    type: String,
    required: true,
  },
  submissionTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  verdict: {
    type: String,
    enum: ["Accepted", "Wrong Answer", "Time Limit Exceeded", "Runtime Error"],
    required: true,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
