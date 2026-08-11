import mongoose from 'mongoose';

export interface InMemUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  industry?: string;
  experience?: string;
  skills: string[];
  bio?: string;
  credits: number;
  roadmapCompleted?: number;
  linkedin?: string;
  github?: string;
}

declare global {
  var inMemoryUsersStore: InMemUser[];
}

if (!global.inMemoryUsersStore) {
  global.inMemoryUsersStore = [
    {
      _id: "65c2f0000000000000000001",
      name: "Demo Student",
      email: "demo@pathshala.ai",
      password: "$2a$10$7v5J24W6z94H5lqWz0V4xe2nS0mS5l1P8l90k8P.5N3N1M0O1P2Q3", // bcrypt hash for password "password123"
      skills: ["Python", "NDA Mathematics"],
      credits: 20,
      roadmapCompleted: 1,
    }
  ];
}

export const inMemoryUsers = global.inMemoryUsersStore;

export function generateValidObjectId(): string {
  return new mongoose.Types.ObjectId().toString();
}
