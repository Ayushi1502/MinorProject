import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  targetRole: { type: String, required: true },
  generatedAt: { type: Date, default: Date.now },
  version: { type: Number, default: 1 }
}, { timestamps: true });

const nodeSchema = new mongoose.Schema({
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },
  title: { type: String, required: true },
  details: { type: String, required: true },
  resources: [{ title: String, url: String }],
  position: { x: Number, y: Number }
});

const nodeDependencySchema = new mongoose.Schema({
  nodeId: { type: mongoose.Schema.Types.ObjectId, ref: "Node", required: true },
  dependencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Node", required: true }
});

const userNodeProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  nodeId: { type: mongoose.Schema.Types.ObjectId, ref: "Node", required: true },
  status: { type: String, enum: ["not_started", "in_progress", "completed"], default: "not_started" },
  completedAt: { type: Date }
}, { timestamps: true });

// Ensure a user has unique progress for each node
userNodeProgressSchema.index({ userId: 1, nodeId: 1 }, { unique: true });

export const Roadmap = mongoose.models.Roadmap || mongoose.model("Roadmap", roadmapSchema);
export const Node = mongoose.models.Node || mongoose.model("Node", nodeSchema);
export const NodeDependency = mongoose.models.NodeDependency || mongoose.model("NodeDependency", nodeDependencySchema);
export const UserNodeProgress = mongoose.models.UserNodeProgress || mongoose.model("UserNodeProgress", userNodeProgressSchema);