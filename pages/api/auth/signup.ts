import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { inMemoryUsers, generateValidObjectId } from '@/lib/inMemoryUsers';

const JWT_SECRET = process.env.JWT_SECRET || 'pathshala_super_secret_jwt_key_2026';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password, imageUrl } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const conn = await dbConnect();
    let userId: string;

    if (conn) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        image: imageUrl || "",
      });

      await newUser.save();
      userId = newUser._id.toString();
    } else {
      // In-memory fallback with valid hex ObjectId
      const existing = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newMemUser = {
        _id: generateValidObjectId(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        image: imageUrl || "",
        skills: [],
        credits: 20,
        roadmapCompleted: 0
      };

      inMemoryUsers.push(newMemUser);
      userId = newMemUser._id;
    }

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

    res.setHeader('Set-Cookie', cookie.serialize('auth_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    }));

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    console.error('Signup API error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}