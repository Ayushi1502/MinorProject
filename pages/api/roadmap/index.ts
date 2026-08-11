import { NextApiRequest, NextApiResponse } from 'next';
import { Roadmap, Node, NodeDependency, UserNodeProgress } from '@/models/Roadmap';
import dbConnect from '@/lib/dbConnect';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';
import User from '@/models/User';
import { inMemoryUsers } from '@/lib/inMemoryUsers';

const JWT_SECRET = process.env.JWT_SECRET || 'pathshala_super_secret_jwt_key_2026';

function getDefaultRoadmapData(role: string = "Full Stack Web Developer") {
  return {
    roadmap: {
      _id: "demo-roadmap-1",
      targetRole: role,
      generatedAt: new Date().toISOString(),
      version: 1,
    },
    nodes: [
      {
        id: "node-1",
        title: `1. Fundamentals of ${role}`,
        details: `Learn key concepts, language syntax, tools, and principles for ${role}.`,
        resources: [
          { title: "Official Documentation", url: "https://developer.mozilla.org" },
          { title: "FreeCodeCamp Complete Course", url: "https://www.youtube.com" }
        ],
        progress: "completed"
      },
      {
        id: "node-2",
        title: `2. Intermediate Development & Practice`,
        details: `Build hands-on projects, master state management, data structures, and APIs.`,
        resources: [
          { title: "Interactive Project Tutorials", url: "https://www.youtube.com" }
        ],
        progress: "in_progress"
      },
      {
        id: "node-3",
        title: `3. System Design & Deployment`,
        details: `Learn CI/CD, database optimization, cloud deployment, and system architecture.`,
        resources: [
          { title: "System Design Guide", url: "https://github.com" }
        ],
        progress: "not_started"
      }
    ],
    dependencies: [
      { source: "node-1", target: "node-2" },
      { source: "node-2", target: "node-3" }
    ]
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const roleQuery = (req.query.role as string) || "Full Stack Web Developer";

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    let userId: string | null = null;

    if (token) {
      try {
        const decoded = verify(token, JWT_SECRET) as { userId: string };
        userId = decoded.userId;
      } catch (err) {}
    }

    const conn = await dbConnect();

    if (conn && userId) {
      const roadmap = await Roadmap.findOne({ userId });
      if (roadmap) {
        const nodes = await Node.find({ roadmapId: roadmap._id });
        const userNodeProgress = await UserNodeProgress.find({ userId });

        const formattedNodes = nodes.map(node => ({
          id: node._id.toString(),
          title: node.title,
          details: node.details,
          resources: node.resources || [],
          position: node.position,
          progress: userNodeProgress.find(p => p.nodeId.equals(node._id))?.status || "not_started",
        }));

        const nodeDependencies = await NodeDependency.find({ nodeId: { $in: nodes.map(n => n._id) } });
        const formattedDependencies = nodeDependencies.map(dep => ({
          source: dep.dependencyId.toString(),
          target: dep.nodeId.toString(),
        }));

        return res.status(200).json({
          roadmap: {
            _id: roadmap._id.toString(),
            targetRole: roadmap.targetRole,
            generatedAt: roadmap.generatedAt,
            version: roadmap.version,
          },
          nodes: formattedNodes,
          dependencies: formattedDependencies,
        });
      }
    }

    // Return default structured roadmap data for demo / guest / fallback
    return res.status(200).json(getDefaultRoadmapData(roleQuery));
  } catch (error) {
    console.error("Roadmap GET handler warning:", error);
    return res.status(200).json(getDefaultRoadmapData(roleQuery));
  }
}
