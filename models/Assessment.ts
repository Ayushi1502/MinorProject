import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizScore: { type: Number, required: true },
    questions: [
      {
        question: String,
        answer: String,
        userAnswer: String,
        isCorrect: Boolean,
      },
    ],
    category: { type: String, required: true },
    improvementTip: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);