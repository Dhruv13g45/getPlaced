import mongoose from "mongoose";

const RoundSchema = new mongoose.Schema(
  {
    roundNumber: {
      type: Number,
      required: true,
    },
    roundType: {
      type: String,
      required: true,
      enum: ["HR", "Technical"],
    },
    questions: {
      type: [String],
      required: true,
    },
  },
  { _id: false },
);

const MockInterviewSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  rounds: {
    type: [RoundSchema],
    required: true,
  },
});

export default mongoose.model("MockInterview", MockInterviewSchema);
