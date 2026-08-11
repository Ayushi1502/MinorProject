"use client";

import React, { useState, useMemo, useEffect } from "react";
import { fieldsData, FieldItem, QuizQuestion } from "@/lib/data/fields-data";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Zap,
  Cpu,
  Building,
  HeartPulse,
  Code,
  Terminal,
  FileCode,
  Globe,
  Layers,
  Brain,
  Calculator,
  Search,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  GraduationCap,
  ListChecks,
  FileText,
  Award,
  Youtube,
  ExternalLink,
  Play,
  CheckSquare,
  Square,
  Check
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Icon mapper helper
const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="h-6 w-6 text-emerald-500" />,
  Zap: <Zap className="h-6 w-6 text-amber-500" />,
  Cpu: <Cpu className="h-6 w-6 text-blue-500" />,
  Building: <Building className="h-6 w-6 text-purple-500" />,
  HeartPulse: <HeartPulse className="h-6 w-6 text-rose-500" />,
  Code: <Code className="h-6 w-6 text-sky-500" />,
  Terminal: <Terminal className="h-6 w-6 text-indigo-500" />,
  FileCode: <FileCode className="h-6 w-6 text-orange-500" />,
  Globe: <Globe className="h-6 w-6 text-teal-500" />,
  Layers: <Layers className="h-6 w-6 text-violet-500" />,
  Brain: <Brain className="h-6 w-6 text-pink-500" />,
  Calculator: <Calculator className="h-6 w-6 text-amber-600" />,
};

export function FieldsExplorer() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedField, setSelectedField] = useState<FieldItem | null>(null);

  // Modal active tab inside details
  const [modalTab, setModalTab] = useState<"overview" | "knowledge" | "videos" | "quiz">("overview");

  // Activity tracking state: { [key: string]: boolean }
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  // Celebratory banner state
  const [completedSkillAlert, setCompletedSkillAlert] = useState<string | null>(null);

  // Quiz state inside modal
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pathshala_activity_progress");
      if (saved) {
        setCompletedItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load saved activity progress", e);
    }
  }, []);

  // Save progress to localStorage
  const saveCompletedItems = (updated: Record<string, boolean>) => {
    setCompletedItems(updated);
    try {
      localStorage.setItem("pathshala_activity_progress", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  };

  // Helper to calculate total items and percentage for a field
  const getFieldProgressStats = (field: FieldItem) => {
    const totalTopics = field.subjects.reduce((sum, sub) => sum + sub.keyTopics.length, 0);
    const totalPlaylists = field.youtubePlaylists.length;
    const grandTotal = totalTopics + totalPlaylists;

    let completedCount = 0;
    // Count completed keyTopics
    field.subjects.forEach((sub) => {
      sub.keyTopics.forEach((t) => {
        const itemKey = `${field.id}_topic_${t}`;
        if (completedItems[itemKey]) completedCount++;
      });
    });

    // Count completed playlists
    field.youtubePlaylists.forEach((p) => {
      const itemKey = `${field.id}_yt_${p.id}`;
      if (completedItems[itemKey]) completedCount++;
    });

    const percentage = grandTotal > 0 ? Math.round((completedCount / grandTotal) * 100) : 0;
    return { grandTotal, completedCount, percentage };
  };

  // Toggle completion of a topic or video
  const toggleItemCompletion = async (field: FieldItem, itemKey: string) => {
    const isCurrentlyDone = !!completedItems[itemKey];
    const updated = { ...completedItems, [itemKey]: !isCurrentlyDone };
    saveCompletedItems(updated);

    // Calculate new percentage for this field
    const totalTopics = field.subjects.reduce((sum, sub) => sum + sub.keyTopics.length, 0);
    const totalPlaylists = field.youtubePlaylists.length;
    const grandTotal = totalTopics + totalPlaylists;

    let completedCount = 0;
    field.subjects.forEach((sub) => {
      sub.keyTopics.forEach((t) => {
        const k = `${field.id}_topic_${t}`;
        if (updated[k]) completedCount++;
      });
    });
    field.youtubePlaylists.forEach((p) => {
      const k = `${field.id}_yt_${p.id}`;
      if (updated[k]) completedCount++;
    });

    const newPercentage = grandTotal > 0 ? Math.round((completedCount / grandTotal) * 100) : 0;

    // Trigger auto-addition to Resume if 100% completed!
    if (newPercentage === 100 && !isCurrentlyDone) {
      setCompletedSkillAlert(field.skillName);
      try {
        await fetch("/api/user/complete-field", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            skillName: field.skillName,
            fieldTitle: field.title,
          }),
        });
      } catch (err) {
        console.error("Auto skill sync failed", err);
      }
    }
  };

  const filteredFields = useMemo(() => {
    return fieldsData.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.shortDescription.toLowerCase().includes(query) ||
        item.subjects.some(s => s.name.toLowerCase().includes(query) || s.keyTopics.some(t => t.toLowerCase().includes(query)));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleOpenDetails = (field: FieldItem) => {
    setSelectedField(field);
    setModalTab("overview");
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  const handleOptionSelect = (qId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = (questions: QuizQuestion[]) => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleGenerateRoadmap = (roleName: string) => {
    router.push(`/roadmap?step=generate&role=${encodeURIComponent(roleName)}`);
  };

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      {/* 100% Completion Resume Alert Toast */}
      {completedSkillAlert && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-emerald-900/90 text-white p-4 rounded-xl shadow-2xl border border-emerald-500 backdrop-blur-md">
          <div className="flex items-start gap-3">
            <Sparkles className="h-6 w-6 text-yellow-400 flex-shrink-0 animate-bounce" />
            <div>
              <h4 className="font-bold text-base">🎉 100% Roadmap Completed!</h4>
              <p className="text-xs text-emerald-100 mt-1">
                Awesome work! <span className="font-semibold text-white">'{completedSkillAlert}'</span> has been automatically added to your Resume skills!
              </p>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="text-xs bg-white text-emerald-950 hover:bg-emerald-100"
                  onClick={() => router.push("/resume-builder")}
                >
                  View Updated Resume →
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-emerald-200 hover:text-white"
                  onClick={() => setCompletedSkillAlert(null)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="px-4 py-1 mb-4 text-sm font-semibold border-primary/40 bg-primary/5 text-primary">
            <GraduationCap className="h-4 w-4 mr-2 inline" /> Multi-Domain Learning & Progress Tracker
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Explore <span className="text-primary bg-clip-text">Exams, Tech & YouTube Playlists</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get YouTube video playlists, basic knowledge notes, formulas, practice quizzes, and live activity percentage reports for NDA, JEE, GATE, SSC, NEET, Python, C++, Java, Web Dev, DSA & more!
          </p>
        </motion.div>

        {/* Search & Category Filter Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search NDA, JEE, Python, C++..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border-primary/20 focus-visible:ring-primary"
            />
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full bg-muted/60 p-1">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="competitive-exams">Exams</TabsTrigger>
              <TabsTrigger value="programming">Coding</TabsTrigger>
              <TabsTrigger value="foundational">Skills</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Grid of Fields */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredFields.map((field, idx) => {
            const { percentage, completedCount, grandTotal } = getFieldProgressStats(field);
            return (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-all border-border/60 hover:border-primary/50 group bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {iconMap[field.iconName] || <BookOpen className="h-6 w-6 text-primary" />}
                      </div>
                      <Badge variant="secondary" className="font-medium text-xs">
                        {field.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {field.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {field.shortDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow pb-4 space-y-4">
                    {/* Live Progress Bar Report */}
                    <div className="bg-muted/40 p-3 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Progress Report
                        </span>
                        <span className={`font-bold ${percentage === 100 ? "text-emerald-500" : "text-primary"}`}>
                          {percentage}% ({completedCount}/{grandTotal})
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      {percentage === 100 && (
                        <span className="text-[10px] font-bold text-emerald-500 block mt-1">
                          ✓ Skill Auto-Added to Resume
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                        Subjects & Videos:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {field.subjects.map((sub, sIdx) => (
                          <Badge key={sIdx} variant="outline" className="text-xs bg-background/50">
                            {sub.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 flex flex-col gap-2">
                    <div className="flex gap-2 w-full">
                      <Button
                        variant="outline"
                        className="flex-1 text-xs border-primary/30 hover:bg-primary/10"
                        onClick={() => handleOpenDetails(field)}
                      >
                        <BookOpen className="h-3.5 w-3.5 mr-1.5" /> Course Notes
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1 text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20"
                        onClick={() => {
                          handleOpenDetails(field);
                          setModalTab("videos");
                        }}
                      >
                        <Youtube className="h-3.5 w-3.5 mr-1.5" /> Playlists
                      </Button>
                    </div>
                    <Button
                      className="w-full text-xs btn-glossy"
                      onClick={() => handleGenerateRoadmap(field.roadmapRoleName)}
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Generate AI Roadmap
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredFields.length === 0 && (
          <div className="col-span-full text-center py-12">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-lg font-semibold">No fields found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your search term or filter category.</p>
          </div>
        )}
      </div>

      {/* Field Detailed Modal */}
      {selectedField && (
        <Dialog open={!!selectedField} onOpenChange={(open) => !open && setSelectedField(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 rounded-lg bg-primary/10">
                  {iconMap[selectedField.iconName] || <BookOpen className="h-6 w-6 text-primary" />}
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold flex items-center justify-between gap-2">
                    <span>{selectedField.title}</span>
                    <Badge variant="outline" className="text-xs font-normal">
                      {selectedField.badge}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription>{selectedField.shortDescription}</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Live Modal Progress Header */}
            {(() => {
              const { percentage, completedCount, grandTotal } = getFieldProgressStats(selectedField);
              return (
                <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 my-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <Award className="h-4 w-4" /> Activity Completion Report: {percentage}%
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {completedCount} / {grandTotal} Activities Completed
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2.5" />
                  {percentage === 100 && (
                    <p className="text-xs font-bold text-emerald-500 mt-2 flex items-center gap-1">
                      <Check className="h-4 w-4" /> 100% Completed! Skill "{selectedField.skillName}" is auto-included in your Resume.
                    </p>
                  )}
                </div>
              );
            })()}

            {/* Modal Internal Navigation */}
            <div className="flex border-b border-border my-2 gap-4 overflow-x-auto">
              <button
                className={`pb-2 font-medium text-sm border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  modalTab === "overview"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setModalTab("overview")}
              >
                <FileText className="h-4 w-4" /> Overview & Pattern
              </button>
              <button
                className={`pb-2 font-medium text-sm border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  modalTab === "knowledge"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setModalTab("knowledge")}
              >
                <BookOpen className="h-4 w-4" /> Basic Knowledge & Topics
              </button>
              <button
                className={`pb-2 font-medium text-sm border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  modalTab === "videos"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setModalTab("videos")}
              >
                <Youtube className="h-4 w-4 text-rose-500" /> YouTube Playlists ({selectedField.youtubePlaylists.length})
              </button>
              <button
                className={`pb-2 font-medium text-sm border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  modalTab === "quiz"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setModalTab("quiz")}
              >
                <ListChecks className="h-4 w-4" /> Practice Quiz ({selectedField.quizQuestions.length})
              </button>
            </div>

            {/* Modal Tab Content */}
            <div className="py-2">
              {modalTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      About this Domain / Exam
                    </h4>
                    <p className="text-foreground leading-relaxed">{selectedField.overview}</p>
                  </div>

                  <div className="bg-muted/40 rounded-xl p-4 border border-border/50">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" /> Exam Structure / Eligibility Overview
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      {selectedField.examPatternOrStructure.duration && (
                        <div>
                          <span className="font-semibold text-muted-foreground">Duration: </span>
                          <span>{selectedField.examPatternOrStructure.duration}</span>
                        </div>
                      )}
                      {selectedField.examPatternOrStructure.totalMarks && (
                        <div>
                          <span className="font-semibold text-muted-foreground">Total Marks / Questions: </span>
                          <span>{selectedField.examPatternOrStructure.totalMarks}</span>
                        </div>
                      )}
                      {selectedField.examPatternOrStructure.mode && (
                        <div>
                          <span className="font-semibold text-muted-foreground">Exam Mode: </span>
                          <span>{selectedField.examPatternOrStructure.mode}</span>
                        </div>
                      )}
                      {selectedField.examPatternOrStructure.eligibility && (
                        <div>
                          <span className="font-semibold text-muted-foreground">Eligibility: </span>
                          <span>{selectedField.examPatternOrStructure.eligibility}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Syllabus & Core Subjects Included
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedField.examPatternOrStructure.subjectsList.map((sub, i) => (
                        <div key={i} className="flex items-center gap-2 bg-background p-3 rounded-lg border">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm font-medium">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "knowledge" && (
                <div className="space-y-6">
                  {selectedField.subjects.map((sub, idx) => (
                    <div key={idx} className="border border-border/80 rounded-xl p-5 bg-card">
                      <h4 className="text-lg font-bold text-primary mb-1">{sub.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{sub.description}</p>

                      <div className="mb-4">
                        <h5 className="text-xs font-semibold text-foreground uppercase mb-2">
                          Key Topics Covered (Click checkbox to mark watched/completed):
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {sub.keyTopics.map((topic, tIdx) => {
                            const itemKey = `${selectedField.id}_topic_${topic}`;
                            const isDone = !!completedItems[itemKey];
                            return (
                              <button
                                key={tIdx}
                                onClick={() => toggleItemCompletion(selectedField, itemKey)}
                                className={`flex items-center gap-2.5 text-left p-2.5 rounded-lg border text-xs transition-all ${
                                  isDone
                                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold"
                                    : "bg-background hover:bg-muted/50 border-border text-foreground"
                                }`}
                              >
                                {isDone ? (
                                  <CheckSquare className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                ) : (
                                  <Square className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                )}
                                <span>{topic}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {sub.importantFormulasOrNotes.length > 0 && (
                        <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                          <h5 className="text-xs font-bold text-primary uppercase mb-2 flex items-center gap-1.5">
                            <Zap className="h-3.5 w-3.5" /> Essential Formulas & Basic Concepts:
                          </h5>
                          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-foreground/90 font-mono">
                            {sub.importantFormulasOrNotes.map((note, nIdx) => (
                              <li key={nIdx}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {modalTab === "videos" && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Click any YouTube playlist to open the course. Mark playlists as completed to update your roadmap progress report!
                  </p>
                  {selectedField.youtubePlaylists.map((playlist) => {
                    const itemKey = `${selectedField.id}_yt_${playlist.id}`;
                    const isDone = !!completedItems[itemKey];
                    return (
                      <div
                        key={playlist.id}
                        className={`border rounded-xl p-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          isDone
                            ? "bg-emerald-500/5 border-emerald-500/40"
                            : "bg-card hover:bg-muted/40 border-border"
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <button
                            onClick={() => toggleItemCompletion(selectedField, itemKey)}
                            className="mt-1 flex-shrink-0"
                          >
                            {isDone ? (
                              <CheckSquare className="h-5 w-5 text-emerald-500" />
                            ) : (
                              <Square className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>
                          <div>
                            <h4 className="font-bold text-base flex items-center gap-2">
                              {playlist.title}
                              <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-600 border-rose-500/30">
                                {playlist.videoCount}
                              </Badge>
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Channel: <span className="font-semibold text-foreground">{playlist.channel}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <a
                            href={playlist.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                          >
                            <Button size="sm" className="w-full sm:w-auto text-xs bg-rose-600 hover:bg-rose-700 text-white">
                              <Play className="h-3.5 w-3.5 mr-1.5 fill-current" /> Watch on YouTube
                              <ExternalLink className="h-3 w-3 ml-1.5" />
                            </Button>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {modalTab === "quiz" && (
                <div className="space-y-6">
                  {selectedField.quizQuestions.map((q, qIdx) => {
                    const selectedOpt = userAnswers[q.id];
                    const isCorrect = selectedOpt === q.correctAnswer;
                    return (
                      <div key={q.id} className="border rounded-xl p-5 bg-card">
                        <h4 className="font-semibold text-base mb-3">
                          Q{qIdx + 1}. {q.question}
                        </h4>
                        <div className="space-y-2 mb-4">
                          {q.options.map((opt, oIdx) => {
                            let optStyle = "hover:bg-muted/60 border-border";
                            if (selectedOpt === oIdx) {
                              optStyle = "border-primary bg-primary/10 font-semibold";
                            }
                            if (quizSubmitted) {
                              if (oIdx === q.correctAnswer) {
                                optStyle = "border-emerald-500 bg-emerald-500/10 font-semibold text-emerald-600 dark:text-emerald-400";
                              } else if (selectedOpt === oIdx && !isCorrect) {
                                optStyle = "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400";
                              }
                            }
                            return (
                              <button
                                key={oIdx}
                                className={`w-full text-left p-3 rounded-lg border text-sm transition-all flex items-center justify-between ${optStyle}`}
                                onClick={() => handleOptionSelect(q.id, oIdx)}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && oIdx === q.correctAnswer && (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="bg-muted/50 p-3 rounded-lg border text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">Explanation: </span>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between pt-2">
                    {!quizSubmitted ? (
                      <Button
                        onClick={() => setQuizSubmitted(true)}
                        disabled={Object.keys(userAnswers).length === 0}
                        className="btn-glossy"
                      >
                        Submit Answers
                      </Button>
                    ) : (
                      <div className="flex items-center justify-between w-full bg-primary/10 p-4 rounded-xl">
                        <span className="font-bold text-foreground">
                          Your Score: {calculateScore(selectedField.quizQuestions)} / {selectedField.quizQuestions.length}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setUserAnswers({});
                            setQuizSubmitted(false);
                          }}
                        >
                          Retake Quiz
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedField(null);
                  router.push(`/chatbot?topic=${encodeURIComponent(selectedField.title)}`);
                }}
              >
                Ask AI Tutor about {selectedField.title}
              </Button>
              <Button
                className="btn-glossy"
                onClick={() => {
                  setSelectedField(null);
                  handleGenerateRoadmap(selectedField.roadmapRoleName);
                }}
              >
                <Sparkles className="h-4 w-4 mr-2" /> Generate AI Roadmap for {selectedField.title}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
