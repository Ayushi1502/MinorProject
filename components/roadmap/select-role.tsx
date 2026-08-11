"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { useRouter } from "next/navigation";

interface JobProfile {
  title: string;
  description: string;
}

const defaultDomains: JobProfile[] = [
  { title: "NDA (National Defence Academy)", description: "Mathematics, General Ability Test, Physics, Chemistry, English & Current Affairs." },
  { title: "JEE Main & Advanced Aspirant", description: "Comprehensive Physics, Chemistry & Mathematics for IIT / NIT entrance." },
  { title: "NEET Medical Aspirant", description: "NCERT Biology (Botany & Zoology), Physics, and Chemistry for MBBS entrance." },
  { title: "GATE Aspirant (Computer Science / Engineering)", description: "Engineering Mathematics, Aptitude, OS, DBMS, Networks & Algorithms." },
  { title: "SSC CGL / CHSL Officer", description: "Quantitative Aptitude, Reasoning, English Comprehension & General Awareness." },
  { title: "Python & Data Science Engineer", description: "Python fundamentals, NumPy, Pandas, Data Structures & Machine Learning." },
  { title: "C++ & Competitive Programmer", description: "Fast I/O, Pointers, Memory Management, STL Vectors, Maps, Sets & DSA." },
  { title: "Full Stack Web Developer", description: "HTML5, CSS3, Modern JavaScript, React.js, Next.js & Node.js Backend." },
];

export function SelectRole() {
  const [jobProfiles, setJobProfiles] = useState<JobProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch("/api/jobs/suggestions");
        if (res.ok) {
          const { suggestions } = await res.json();
          if (suggestions && suggestions.length > 0) {
            setJobProfiles(suggestions);
          } else {
            setJobProfiles(defaultDomains);
          }
        } else {
          setJobProfiles(defaultDomains);
        }
      } catch (error) {
        console.error("Failed to fetch job suggestions", error);
        setJobProfiles(defaultDomains);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const handleChoosePath = (role: string) => {
    router.push(`/roadmap?step=generate&role=${encodeURIComponent(role)}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Choose Your Learning Path</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Select a competitive exam or engineering field to generate your personalized AI study roadmap.
        </p>
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
          onClick={() => router.push("/fields")}
        >
          View Basic Knowledge & Formulas Hub →
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                </CardContent>
                <div className="p-6 pt-0">
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))
          : jobProfiles.map((profile) => (
              <Card key={profile.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{profile.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{profile.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => handleChoosePath(profile.title)}
                  >
                    Choose this Path
                  </Button>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
}
