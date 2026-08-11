import mongoose from "mongoose";

const industryInsightSchema = new mongoose.Schema(
  {
    industry: { type: String, required: true, unique: true },
    salaryRanges: [
      {
        role: String,
        min: Number,
        max: Number,
        median: Number,
        location: String,
      },
    ],
    growthRate: { type: Number, required: true },
    demandLevel: { type: String, enum: ["High", "Medium", "Low"], required: true },
    topSkills: { type: [String], default: [] },
    marketOutlook: { type: String, enum: ["Positive", "Neutral", "Negative"], required: true },
    keyTrends: { type: [String], default: [] },
    recommendedSkills: { type: [String], default: [] },
    lastUpdated: { type: Date, default: Date.now },
    nextUpdate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.IndustryInsight || mongoose.model("IndustryInsight", industryInsightSchema);