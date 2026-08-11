import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationInSeconds: { type: Number, required: true },
});

export default mongoose.models.ActivityLog || mongoose.model("ActivityLog", activityLogSchema);