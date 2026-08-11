
import { NextApiRequest, NextApiResponse } from 'next';
import { Roadmap } from '@/models/Roadmap';
import dbConnect from '@/lib/dbConnect';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';
import User from '@/models/User';

async function getUserFromRequest(req: NextApiRequest) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.auth_token;

  if (!token) {
    return null;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    await dbConnect();
    const user = await User.findById(decoded.userId);
    return user;
  } catch (error) {
    console.error("Error getting user from request:", error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect(); // Ensure DB connection is established

  const user = await getUserFromRequest(req);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const roadmap = await Roadmap.findOne({ userId: user._id });

    if (roadmap) {
      res.status(200).json({ exists: true, roadmapId: roadmap._id });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Failed to check roadmap status', error);
    res.status(500).json({ message: 'Failed to check roadmap status' });
  }
}
