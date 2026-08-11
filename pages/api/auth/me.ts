import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';
import { inMemoryUsers } from '@/lib/inMemoryUsers';

const JWT_SECRET = process.env.JWT_SECRET || 'pathshala_super_secret_jwt_key_2026';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    const conn = await dbConnect();

    let foundUser: any = null;

    if (conn) {
      foundUser = await User.findById(decoded.userId).select('-password');
    }

    if (!foundUser) {
      const memUser = inMemoryUsers.find(u => u._id === decoded.userId);
      if (memUser) {
        const { password, ...safeUser } = memUser;
        foundUser = safeUser;
      }
    }

    if (!foundUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.status(200).json({ user: foundUser });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}