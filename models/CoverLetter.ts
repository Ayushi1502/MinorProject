import mongoose from "mongoose";

const coverLetterSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    jobDescription: { type: String, default: "" },
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    status: { type: String, enum: ["draft", "completed"], default: "draft" },
  },
  { timestamps: true }
);

export default mongoose.models.CoverLetter || mongoose.model("CoverLetter", coverLetterSchema);