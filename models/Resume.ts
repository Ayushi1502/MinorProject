import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    content: { type: String, required: true }, // markdown text
    atsScore: { type: Number, default: null },
    feedback: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model("Resume", resumeSchema);