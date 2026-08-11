import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import User from '@/models/User';
import { Roadmap, Node, NodeDependency } from '@/models/Roadmap';
import dbConnect from '@/lib/dbConnect';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';
import mongoose from 'mongoose';
import { inMemoryUsers } from '@/lib/inMemoryUsers';

const JWT_SECRET = process.env.JWT_SECRET || 'pathshala_super_secret_jwt_key_2026';

function createFallbackRoadmapData(role: string) {
  return {
    nodes: [
      {
        id: 1,
        title: `1. Fundamentals of ${role}`,
        details: `Learn core concepts, syntax, and foundational principles for ${role}.`,
        resources: [{ title: "Official Documentation & Guide", url: "https://developer.mozilla.org" }]
      },
      {
        id: 2,
        title: `2. Intermediate Topics & Frameworks for ${role}`,
        details: `Deep dive into key libraries, tooling, and architectural patterns required for ${role}.`,
        resources: [{ title: "Comprehensive Tutorials & Video Series", url: "https://www.youtube.com" }]
      },
      {
        id: 3,
        title: `3. Advanced Systems & Best Practices`,
        details: `Master performance optimization, security, state management, and enterprise patterns.`,
        resources: [{ title: "Best Practices & Industry Standards", url: "https://github.com" }]
      },
      {
        id: 4,
        title: `4. Real-World Capstone Project`,
        details: `Build and deploy a full-scale portfolio project demonstrating expertise in ${role}.`,
        resources: [{ title: "Project Deployment & Portfolio Showcase", url: "https://vercel.com" }]
      }
    ],
    dependencies: [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 }
    ]
  };
}

async function getUserFromRequest(req: NextApiRequest) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.auth_token;

  if (!token) return null;

  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    const conn = await dbConnect();
    if (conn && mongoose.Types.ObjectId.isValid(decoded.userId)) {
      const user = await User.findById(decoded.userId);
      if (user) return user;
    }
    const memUser = inMemoryUsers.find(u => u._id === decoded.userId);
    if (memUser) return memUser;
  } catch (error) {
    console.error("Error getting user from request:", error);
  }
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { targetRole } = req.body || {};

  if (!targetRole) {
    return res.status(400).json({ message: 'targetRole is required' });
  }

  const user = await getUserFromRequest(req);
  const userId = (user && mongoose.Types.ObjectId.isValid(user._id || user.id))
    ? (user._id || user.id)
    : new mongoose.Types.ObjectId().toString();

  let roadmapData = createFallbackRoadmapData(targetRole);

  // Try generating with Gemini API if key is available
  if (process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Generate a learning roadmap for target role: "${targetRole}". Return JSON object with "nodes" array (id, title, details, resources) and "dependencies" array (source, target).`;
      
      const result = await model.generateContent(prompt);
      const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const cleanedText = text.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleanedText);
        if (parsed.nodes && parsed.nodes.length > 0) {
          roadmapData = parsed;
        }
      }
    } catch (geminiError) {
      console.warn("Gemini API skipped/failed, using structured fallback roadmap:", geminiError);
    }
  }

  // Try saving to DB if connected
  try {
    const conn = await dbConnect();
    if (conn && mongoose.Types.ObjectId.isValid(userId.toString())) {
      await Roadmap.deleteMany({ userId });
      
      const newRoadmap = new Roadmap({
        userId,
        targetRole,
      });
      await newRoadmap.save();

      const nodeIdMap = new Map<number, mongoose.Types.ObjectId>();

      for (const nodeData of roadmapData.nodes) {
        const newNode = new Node({
          roadmapId: newRoadmap._id,
          title: nodeData.title,
          details: nodeData.details,
          resources: nodeData.resources || [],
        });
        await newNode.save();
        nodeIdMap.set(nodeData.id, newNode._id);
      }

      if (roadmapData.dependencies) {
        for (const dep of roadmapData.dependencies) {
          const sourceId = nodeIdMap.get(dep.source);
          const targetId = nodeIdMap.get(dep.target);

          if (sourceId && targetId) {
            const newDependency = new NodeDependency({
              nodeId: targetId,
              dependencyId: sourceId,
            });
            await newDependency.save();
          }
        }
      }

      return res.status(200).json({ message: 'Roadmap generated successfully', roadmapId: newRoadmap._id });
    }
  } catch (dbError) {
    console.warn("DB save warning, returning generated roadmap directly:", dbError);
  }

  // Return success even in offline/demo mode
  return res.status(200).json({
    message: 'Roadmap generated successfully',
    roadmapId: 'demo-roadmap-' + Date.now(),
    roadmapData
  });
}
