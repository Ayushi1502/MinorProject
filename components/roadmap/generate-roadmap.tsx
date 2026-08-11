"use client";

import { Button } from "@/components/ui/button";
import { Route, Sparkles } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export function GenerateRoadmap() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("role") || "Full Stack Web Developer";
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetRole: jobTitle }),
      });
    } catch (error) {
      console.error("An error occurred during roadmap generation:", error);
    } finally {
      router.push(`/roadmap?step=visualization&role=${encodeURIComponent(jobTitle)}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
      <div className="p-4 bg-primary/10 rounded-full mb-4">
        <Sparkles className="h-10 w-10 text-primary animate-pulse" />
      </div>
      <h1 className="text-4xl font-bold mb-4">You've selected: {jobTitle}</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        We're ready to build your personalized learning path with modules, resources, and progress tracking.
      </p>
      <Button
        size="lg"
        onClick={handleGenerate}
        disabled={isLoading}
        className="btn-glossy px-8 py-6 text-lg font-semibold shadow-xl hover:scale-105 transition-all"
      >
        {isLoading ? (
          "Building Your Roadmap..."
        ) : (
          <>
            <Route className="mr-2 h-6 w-6 text-primary-foreground" />
            Generate Your Roadmap
          </>
        )}
      </Button>
    </div>
  );
}
