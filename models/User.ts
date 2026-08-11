import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    image: { type: String, default: "" }, // Cloudinary URL
    bio: { type: String, default: "" },
    industry: { type: String, required: false }, // dropdown controlled
    experience: {
      type: String,
      enum: ["0-2 years", "2-5 years", "5-10 years", "10+ years"],
      required: false,
    },
    skills: { type: [String], default: [] }, // array of skills
    roadmapCompleted: { type: Number, default: 0 },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    plan: { type: String, enum: ["basic", "premium"], default: "basic" },
    credits: { type: Number, default: 20 }, // for chatbot usage
    currentStreak: { type: Number, default: 0 }, 
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);