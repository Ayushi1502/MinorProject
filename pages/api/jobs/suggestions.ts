import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const user = await getUserFromRequest(req);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { skills, industry, experience } = user;

  const prompt = `
    Based on the following user profile, suggest 5 relevant and diverse job profiles. For each job profile, provide a title and a short description (1-2 sentences).

    User Profile:
    - Bio: ${user.bio}
    - Skills: ${skills.join(', ')}
    - Industry: ${industry}
    - Experience: ${experience || 'Not specified'}

    Return the suggestions as a JSON array of objects, where each object has a "title" and a "description" property.
    For example:
    [
      {"title": "Job 1", "description": "Description for Job 1."},
      {"title": "Job 2", "description": "Description for Job 2."},
      {"title": "Job 3", "description": "Description for Job 3."},
      {"title": "Job 4", "description": "Description for Job 4."},
      {"title": "Job 5", "description": "Description for Job 5."}
    ]
  `;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.candidates[0].content.parts[0].text;

    try {
      // Clean the text to remove markdown and extra characters
      const cleanedText = text.replace(/```json|```/g, '').trim();
      const suggestions = JSON.parse(cleanedText);
      res.status(200).json({ suggestions });
    } catch (error) {
        console.error('Failed to parse JSON from Gemini API', error);
        res.status(500).json({ message: 'Failed to parse suggestions' });
    }
  } catch (error) {
    console.error('Failed to get suggestions from Gemini API', error);
    if (error instanceof Error) {
        console.error(error.stack);
    }
    res.status(500).json({ message: 'Failed to get suggestions' });
  }
}
