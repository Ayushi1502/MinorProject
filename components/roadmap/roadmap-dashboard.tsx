"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { SelectRole } from "./select-role";
import { GenerateRoadmap } from "./generate-roadmap";
import { LoadingRoadmap } from "./loading-roadmap";
import { RoadmapVisualization } from "./roadmap-visualization";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoadmapNode {
  id: string;
  title: string;
  details: string;
  resources: { title: string; url: string }[];
  position?: { x: number; y: number };
  progress: string;
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

export function RoadmapDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = searchParams.get("step");
  const roleParam = searchParams.get("role") || "Full Stack Web Developer";

  const [roadmapData, setRoadmapData] = useState<FullRoadmapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch roadmap data whenever in visualization step or default step
    if (!step || step === "visualization" || step === "loading") {
      const fetchRoadmap = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/roadmap?role=${encodeURIComponent(roleParam)}`);
          if (res.ok) {
            const data = await res.json();
            setRoadmapData(data);
          }
        } catch (err) {
          console.error("Error fetching roadmap:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchRoadmap();
    }
  }, [step, roleParam]);

  const renderContent = () => {
    switch (step) {
      case "select_role":
        return <SelectRole />;
      case "generate":
        return <GenerateRoadmap />;
      case "loading":
        return <LoadingRoadmap />;
      case "visualization":
      default:
        if (loading) {
          return (
            <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
              <Loader2 className="h-16 w-16 animate-spin text-primary mb-8" />
              <h1 className="text-3xl font-bold mb-4">Building your personalized roadmap...</h1>
              <p className="text-lg text-muted-foreground">
                Please wait a moment.
              </p>
            </div>
          );
        } else if (roadmapData) {
          return <RoadmapVisualization roadmapData={roadmapData} />;
        } else {
          return (
            <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold mb-4">Ready to start?</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Select your target exam or engineering domain to view your roadmap.
              </p>
              <Button size="lg" className="btn-glossy" onClick={() => router.push("/roadmap?step=select_role")}>
                Choose Your Learning Path →
              </Button>
            </div>
          );
        }
    }
  };

  return <div>{renderContent()}</div>;
}
