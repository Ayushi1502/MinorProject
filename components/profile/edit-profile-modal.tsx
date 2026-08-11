
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Design",
  "Engineering",
  "Data Science",
  "Other",
];

const experienceLevels = [
  "0-2 years",
  "2-5 years",
  "5-10 years",
  "10+ years",
];

const popularSkills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "TypeScript",
  "SQL",
  "AWS",
  "Docker",
  "Machine Learning",
  "Data Analysis",
  "UI/UX Design",
  "Project Management",
  "Digital Marketing",
  "Content Writing",
  "Cybersecurity",
  "DevOps",
  "Others",
];

export function EditProfileModal({ isOpen, onClose }) {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: "",
    experience: "",
    industry: "",
    customIndustry: "",
    linkedin: "",
    github: "",
    skills: [] as string[],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        image: user.image || "",
        experience: user.experience || "",
        industry: industries.includes(user.industry) ? user.industry : "Other",
        customIndustry: industries.includes(user.industry) ? "" : user.industry,
        linkedin: user.linkedin || "",
        github: user.github || "",
        skills: user.skills || [],
      });
    }
  }, [user, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image: url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalFormData = {
        ...formData,
        industry: formData.industry === "Other" ? formData.customIndustry : formData.industry,
      };

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFormData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser);
        onClose();
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" value={formData.bio} onChange={handleChange} />
            </div>
            <div>
              <Label>Profile Image</Label>
              <ImageUploader onUploadSuccess={handleImageUpload} initialImage={formData.image} />
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Select value={formData.experience} onValueChange={(value) => handleSelectChange("experience", value)}>
                <SelectTrigger><SelectValue placeholder="Select your experience" /></SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                <SelectTrigger><SelectValue placeholder="Select your industry" /></SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.industry === "Other" && (
                <div className="mt-2">
                  <Label htmlFor="customIndustry">Custom Industry</Label>
                  <Input id="customIndustry" value={formData.customIndustry} onChange={handleChange} placeholder="Enter your industry" />
                </div>
              )}
            </div>
            <div>
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                {popularSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    onClick={() => handleSkillToggle(skill)}
                    className="cursor-pointer"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" value={formData.linkedin} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" value={formData.github} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}