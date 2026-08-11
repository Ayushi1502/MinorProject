'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function improveTextWithAI(textToImprove: string) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are an expert career coach and resume writer. Rewrite the following resume text to be more impactful, professional, and achievement-oriented. Use strong action verbs and quantify results where possible. Keep the tone professional. Here is the text to improve: ${textToImprove}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Error improving text with AI:", error);
    return "Error: Could not improve text.";
  }
}
