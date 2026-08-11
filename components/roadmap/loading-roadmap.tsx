import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LoadingRoadmap() {
  const router = useRouter();

  useEffect(() => {
    const checkRoadmapStatus = async () => {
      try {
        const res = await fetch("/api/roadmap/status");
        if (res.ok) {
          const { exists, roadmapId } = await res.json();
          if (exists) {
            router.push("/roadmap"); // Redirect to the final roadmap page
          }
        }
      } catch (error) {
        console.error("Failed to check roadmap status", error);
      }
    };

    const interval = setInterval(checkRoadmapStatus, 3000); // Poll every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary mb-8" />
      <h1 className="text-3xl font-bold mb-4">
        Generating your personalized roadmap...
      </h1>
      <p className="text-lg text-muted-foreground">
        This may take a few moments. Great things are worth waiting for!
      </p>
    </div>
  );
}
