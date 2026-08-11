import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    dateEarned: { type: Date, default: Date.now },
});

export default mongoose.models.Achievement || mongoose.model("Achievement", achievementSchema);