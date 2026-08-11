
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export async function PUT(request: NextRequest) {
  await dbConnect();

  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const token = cookies.auth_token;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;

    const body = await request.json();
    const { name, bio, image, experience, industry, linkedin, github, skills } = body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        bio,
        image,
        experience,
        industry,
        linkedin,
        github,
        skills,
      },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
