"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Play,
  ExternalLink,
  BookOpen,
  Sparkles,
  Award,
  Youtube,
  Check
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RoadmapNode {
  id: string;
  title: string;
  details: string;
  resources: { title: string; url: string }[];
  position?: { x: number; y: number };
  progress: "not_started" | "in_progress" | "completed";
}

interface RoadmapDependency {
  source: string;
  target: string;
}

interface FullRoadmapData {
  roadmap: {
    _id: string;
    targetRole: string;
    generatedAt: string;
    version: number;
  };
  nodes: RoadmapNode[];
  dependencies: RoadmapDependency[];
}

interface RoadmapVisualizationProps {
  roadmapData: FullRoadmapData;
}

export function RoadmapVisualization({ roadmapData }: RoadmapVisualizationProps) {
  const router = useRouter();
  const { roadmap, nodes: initialNodes } = roadmapData;

  const [nodes, setNodes] = useState<RoadmapNode[]>(initialNodes);
  const [completedAlert, setCompletedAlert] = useState<string | null>(null);

  const completedNodesCount = nodes.filter((node) => node.progress === "completed").length;
  const totalNodes = nodes.length;
  const overallProgress = totalNodes > 0 ? Math.round((completedNodesCount / totalNodes) * 100) : 0;

  // Toggle node completion state
  const toggleNodeProgress = async (nodeId: string) => {
    const updated = nodes.map((node) => {
      if (node.id === nodeId) {
        let nextState: "not_started" | "in_progress" | "completed" = "in_progress";
        if (node.progress === "not_started") nextState = "in_progress";
        else if (node.progress === "in_progress") nextState = "completed";
        else nextState = "not_started";
        return { ...node, progress: nextState };
      }
      return node;
    });

    setNodes(updated);

    const newCompletedCount = updated.filter((n) => n.progress === "completed").length;
    const newProgress = Math.round((newCompletedCount / totalNodes) * 100);

    // Trigger auto-addition to Resume if 100% completed
    if (newProgress === 100) {
      setCompletedAlert(roadmap.targetRole);
      try {
        await fetch("/api/user/complete-field", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            skillName: roadmap.targetRole,
            fieldTitle: roadmap.targetRole,
          }),
        });
      } catch (err) {
        console.error("Auto skill sync failed", err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* 100% Completion Resume Alert Banner */}
      {completedAlert && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-emerald-900/95 text-white p-4 rounded-xl shadow-2xl border border-emerald-500 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <Sparkles className="h-6 w-6 text-yellow-400 flex-shrink-0 animate-bounce" />
            <div>
              <h4 className="font-bold text-base">🎉 100% Roadmap Completed!</h4>
              <p className="text-xs text-emerald-100 mt-1">
                Congratulations! <span className="font-semibold text-white">'{completedAlert}'</span> has been automatically added to your Resume skills!
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="text-xs bg-white text-emerald-950 hover:bg-emerald-100 font-semibold"
                  onClick={() => router.push("/resume-builder")}
                >
                  View Updated Resume →
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-emerald-200 hover:text-white"
                  onClick={() => setCompletedAlert(null)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Top Header Card */}
        <Card className="border-border/60 shadow-lg bg-card/90">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{roadmap.targetRole}</CardTitle>
                  <CardDescription className="text-sm mt-0.5">
                    Generated on: {new Date(roadmap.generatedAt || Date.now()).toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/fields")}
                  className="border-primary/40 text-xs"
                >
                  <Youtube className="mr-1.5 h-3.5 w-3.5 text-rose-500" /> Video Playlists
                </Button>
                <Button
                  size="sm"
                  className="btn-glossy text-xs"
                  onClick={() => router.push("/roadmap?step=select_role")}
                >
                  Change Path
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-3 rounded-lg bg-muted/40 border">
                <div className="text-2xl font-bold text-primary">
                  {completedNodesCount}/{totalNodes}
                </div>
                <div className="text-xs text-muted-foreground font-medium">Nodes Completed</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/40 border">
                <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
                <div className="text-xs text-muted-foreground font-medium">Overall Progress</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/40 border">
                <div className="text-2xl font-bold text-primary">4-6 Wks</div>
                <div className="text-xs text-muted-foreground font-medium">Est. Duration</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/40 border">
                <div className="text-2xl font-bold text-emerald-500">Verified</div>
                <div className="text-xs text-muted-foreground font-medium">Certification</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                <span>Learning Path Progress</span>
                <span className="text-primary">{overallProgress}% Completed</span>
              </div>
              <Progress value={overallProgress} className="h-2.5" />
            </div>
          </CardHeader>
        </Card>

        {/* Structured Learning Path */}
        <Card className="border-border/60 shadow-lg bg-card/90">
          <CardHeader>
            <CardTitle className="text-xl">Structured Learning Path</CardTitle>
            <CardDescription>
              Click any node button or checkmark to toggle node status. Complete 100% to auto-add this skill to your Resume!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {nodes.map((node, index) => (
                <motion.div
                  key={node.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative"
                >
                  {/* Vertical Connection Line */}
                  {index < nodes.length - 1 && (
                    <div className="absolute left-6 top-14 w-0.5 h-full -mb-6 bg-border/60 z-0"></div>
                  )}

                  <div
                    className={`relative z-10 flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4 p-5 rounded-xl border transition-all duration-200 ${
                      node.progress === "completed"
                        ? "bg-emerald-500/5 border-emerald-500/40 shadow-sm"
                        : node.progress === "in_progress"
                          ? "bg-primary/5 border-primary/50 ring-1 ring-primary/30"
                          : "bg-card border-border hover:bg-muted/40"
                    }`}
                  >
                    {/* Interactive Step indicator */}
                    <button
                      onClick={() => toggleNodeProgress(node.id)}
                      className="flex-shrink-0 mt-1 cursor-pointer focus:outline-none"
                      title="Click to toggle node progress"
                    >
                      {node.progress === "completed" ? (
                        <CheckCircle2 className="h-7 w-7 text-emerald-500 fill-emerald-500/20" />
                      ) : node.progress === "in_progress" ? (
                        <div className="h-7 w-7 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-ping"></div>
                        </div>
                      ) : (
                        <Circle className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors" />
                      )}
                    </button>

                    {/* Step content */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-lg text-foreground">{node.title}</h4>
                        <div className="flex items-center space-x-2">
                          {node.progress === "completed" && (
                            <Badge className="text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                              Completed ✓
                            </Badge>
                          )}
                          {node.progress === "in_progress" && (
                            <Badge className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/30">
                              In Progress
                            </Badge>
                          )}
                          {node.progress === "not_started" && (
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                              Not Started
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{node.details}</p>

                      {/* Interactive Learning Resource Links */}
                      {node.resources && node.resources.length > 0 && (
                        <div className="mb-4 bg-muted/40 p-3 rounded-lg border border-border/50">
                          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5" /> Recommended Learning Links & Docs:
                          </span>
                          <div className="flex flex-col gap-2">
                            {node.resources.map((res, rIdx) => (
                              <a
                                key={rIdx}
                                href={res.url || `https://www.google.com/search?q=${encodeURIComponent(res.title + " " + node.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-medium text-primary hover:underline flex items-center justify-between p-2 rounded bg-background border hover:border-primary/50 transition-all group"
                              >
                                <span className="flex items-center gap-2">
                                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                                  {res.title}
                                </span>
                                <span className="text-[10px] text-muted-foreground group-hover:text-primary">Open Resource ↗</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/40">
                        <div className="text-xs text-muted-foreground font-medium">
                          Module {index + 1} of {totalNodes}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={node.progress === "completed" ? "outline" : "default"}
                            className={node.progress === "completed" ? "text-xs border-emerald-500/40 text-emerald-600" : "text-xs btn-glossy"}
                            onClick={() => toggleNodeProgress(node.id)}
                          >
                            {node.progress === "completed" ? (
                              <>
                                <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" /> Completed (Click to Reset)
                              </>
                            ) : node.progress === "in_progress" ? (
                              <>
                                Mark Completed <CheckCircle2 className="ml-1.5 h-3.5 w-3.5" />
                              </>
                            ) : (
                              <>
                                Start Module <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
