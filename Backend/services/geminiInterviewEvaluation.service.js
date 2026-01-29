import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_MOCK_INTERVIEW_API_KEY,
});

export async function evaluateMockInterview({
  companyName,
  interviewType,
  responses,
}) {
  try {
    const formattedQA = responses
      .map(
        (item, index) =>
          `${index + 1}. Question: ${item.question}\nAnswer: ${item.answer}`,
      )
      .join("\n\n");

    const prompt = `
You are a senior interviewer evaluating a mock interview.

COMPANY: ${companyName}
INTERVIEW TYPE: ${interviewType}

TASK:
Evaluate the candidate's answers and provide structured feedback.

RULES:
- Be honest and constructive
- Evaluate communication, correctness, confidence, and clarity
- Return ONLY valid JSON (no markdown, no explanation)

OUTPUT FORMAT (STRICT):
{
  "overallScore": number, // out of 10
  "verdict": "Excellent" | "Good" | "Average" | "Poor",
  "strengths": [string],
  "weaknesses": [string],
  "suggestions": [string]
}

QUESTIONS & ANSWERS:
${formattedQA}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const cleanedText = result.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("===== GEMINI EVALUATION ERROR =====");
    console.error(error.message);
    throw new Error("Interview evaluation failed");
  }
}
