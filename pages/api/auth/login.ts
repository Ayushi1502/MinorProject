import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { inMemoryUsers } from '@/lib/inMemoryUsers';

const JWT_SECRET = process.env.JWT_SECRET || 'pathshala_super_secret_jwt_key_2026';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const conn = await dbConnect();
    let userId: string | null = null;
    let userPasswordHash: string | null = null;

    if (conn) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        userId = user._id.toString();
        userPasswordHash = user.password;
      }
    }

    // Fallback to in-memory store if DB query returned nothing or DB offline
    if (!userId) {
      const memUser = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (memUser) {
        userId = memUser._id;
        userPasswordHash = memUser.password;
      }
    }

    if (!userId || !userPasswordHash) {
      return res.status(401).json({ message: 'Invalid credentials. Please check your email and password.' });
    }

    const isMatch = await bcrypt.compare(password, userPasswordHash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

    res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    }));

    return res.status(200).json({ message: 'Logged in successfully' });
  } catch (error: any) {
    console.error('Login API error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}