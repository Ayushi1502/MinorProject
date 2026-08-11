"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PageLoader } from "@/components/page-loader";
import { useAuth } from "@/context/AuthContext";
import { EditProfileModal } from "./edit-profile-modal";
import {
  Edit,
  Mail,
  Calendar,
  Briefcase,
  Award,
  Crown,
  Zap,
  TrendingUp,
  Target,
  User,
  Building,
  Linkedin,
  Github,
} from "lucide-react";

export function UserProfile() {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      // router.push("/auth");
    }
  }, [user, loading]);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <PageLoader type="profile" />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please log in to view your profile.
      </div>
    );
  }

  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <PageLoader type="profile" />}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Hello👋, <span className="text-primary">{user.name?.split(" ")[0]}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage your profile and track your learning progress
              </p>
            </div>
            <Button onClick={handleEditProfile} className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          </div>
        </motion.div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* --- BASIC DETAILS CARD --- */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Basic Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-yellow-500" />
                    <span className="text-lg font-medium">{user.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-yellow-500" />
                    <span className="text-lg font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-yellow-500" />
                    <span className="text-lg font-medium">Joined {joinDate}</span>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Bio</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {user.bio || "No bio provided yet."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* --- PROFESSIONAL DETAIL CARD --- */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Professional Detail</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-5 w-5 text-yellow-500" />
                    <span className="text-lg font-medium">Experience: {user.experience || "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-yellow-500" />
                    <span className="text-lg font-medium">Industry: {user.industry || "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="h-5 w-5 text-yellow-500" />
                    {user.linkedin ? (
                      <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-blue-500 hover:underline">
                        LinkedIn Profile
                      </a>
                    ) : (
                      <span className="text-lg font-medium text-muted-foreground">N/A</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="h-5 w-5 text-yellow-500" />
                    {user.github ? (
                      <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-blue-500 hover:underline">
                        GitHub Profile
                      </a>
                    ) : (
                      <span className="text-lg font-medium text-muted-foreground">N/A</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="space-y-8">
            {/* --- QUICK ACTIONS CARD --- */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => window.location.href = '/resume-builder'}>
                    <Briefcase className="mr-2 h-4 w-4 text-yellow-500" />
                    Update Resume
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => window.location.href = '/roadmap'}>
                    <Target className="mr-2 h-4 w-4 text-yellow-500" />
                    Continue learning
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => window.location.href = '/mentors'}>
                    <Award className="mr-2 h-4 w-4 text-yellow-500" />
                    Expert guidance
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => window.location.href = '/chatbot'}>
                    <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                    Ask AI
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={() => window.location.href = '/pricing'}>
                    <Crown className="mr-2 h-4 w-4 text-yellow-500" />
                    Unlock All Features
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* --- SKILLS CARD --- */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Skills</span>
                  </CardTitle>
                  <CardDescription>Your technical expertise and competencies</CardDescription>
                </CardHeader>
                <CardContent>
                  {user.skills && user.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No skills listed.</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <EditProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}