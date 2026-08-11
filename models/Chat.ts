import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true }, 
    messages: [
      {
        role: { type: String, enum: ["user", "assistant"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

chatSchema.pre("save", function (next) {
  if (this.messages.length > 15) {
    this.messages = this.messages.slice(-15);
  }
  next();
});

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);