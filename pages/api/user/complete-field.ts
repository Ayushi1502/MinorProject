import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User';
import Resume from '@/models/Resume';
import dbConnect from '@/lib/dbConnect';
import { verify } from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: string };
    await dbConnect();
    
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { skillName, fieldTitle } = req.body;

    if (!skillName) {
      return res.status(400).json({ message: 'Skill name is required' });
    }

    // 1. Add skill to User model if not already present
    let isNewSkill = false;
    if (!user.skills.includes(skillName)) {
      user.skills.push(skillName);
      user.roadmapCompleted = (user.roadmapCompleted || 0) + 1;
      await user.save();
      isNewSkill = true;
    }

    // 2. Auto-include skill in User's Resume
    let resume = await Resume.findOne({ userId: decoded.userId });
    if (resume) {
      if (!resume.content.includes(skillName)) {
        // Append skill under Skills section or at bottom of resume content
        if (resume.content.includes("### Skills") || resume.content.includes("## Skills")) {
          resume.content = resume.content.replace(/(###? Skills[^\n]*\n)/i, `$1- **${skillName}** (Auto-Verified PathShalaAI Mastery)\n`);
        } else {
          resume.content += `\n\n### Skills\n- **${skillName}** (Auto-Verified PathShalaAI Mastery)`;
        }
        await resume.save();
      }
    } else {
      // Create fresh Resume with auto-added skill
      const initialResumeContent = `# ${user.name}\nEmail: ${user.email}\n\n## Professional Summary\nMotivated professional with verified expertise in competitive domains and modern technologies.\n\n## Skills\n- **${skillName}** (Auto-Verified PathShalaAI Mastery)\n\n## Education & Certifications\n- PathShalaAI Learning Roadmap Completed: ${fieldTitle || skillName}`;
      
      await Resume.create({
        userId: decoded.userId,
        content: initialResumeContent,
        atsScore: 85,
        feedback: "Auto-generated baseline resume with verified completed skills."
      });
    }

    return res.status(200).json({
      success: true,
      message: isNewSkill
        ? `Congratulations! 100% Roadmap Completed. '${skillName}' has been automatically added to your Resume!`
        : `'${skillName}' is already included in your Resume.`,
      skills: user.skills,
    });
  } catch (error) {
    console.error("Failed to update completed field skill", error);
    return res.status(500).json({ message: 'Server error processing request' });
  }
}
