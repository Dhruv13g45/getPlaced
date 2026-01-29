import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_MOCK_INTERVIEW_API_KEY,
});

export async function generateMockInterviewQuestions({
  companyName,
  interviewType,
  hrReferenceQuestions,
  technicalReferenceQuestions,
}) {
  try {
    let prompt = "";

    if (interviewType === "HR") {
      prompt = `
You are an HR interviewer.

TASK:
Generate exactly 10 HR interview questions for "${companyName}".

IMPORTANT:
- The FIRST question MUST be: "Introduce yourself."
- The remaining 9 questions should test communication, attitude, teamwork, ethics, and cultural fit.
- Avoid repeating reference questions.
- Questions should be realistic and interview-appropriate.

RULES:
- Do NOT rephrase "Introduce yourself."
- Do NOT add explanations.
- Return ONLY valid JSON.

REFERENCE QUESTIONS:
${hrReferenceQuestions.join("\n")}
OUTPUT FORMAT:
{
  "questions": [ "Question 1", "Question 2" ]
}
`;
    }

    if (interviewType === "Technical") {
      prompt = `
You are a senior technical interviewer.

TASK:
Generate exactly 10 technical interview questions for "${companyName}".

GUIDELINES:
- Start with 2–3 easy warm-up questions to make the candidate comfortable.
- Gradually move towards more technical and in-depth questions.
- Take inspiration from the REFERENCE QUESTIONS for topics, difficulty, and interview style.
- Do not repeat any reference question verbatim.
- Questions should feel like a realistic technical interview progression.

RULES:
- Mix conceptual and practical questions.
- Avoid generic or unrelated questions.
- Do not add explanations or extra text.
- Return ONLY valid JSON.

REFERENCE QUESTIONS (FOR INSPIRATION):
${technicalReferenceQuestions.join("\n")}
OUTPUT FORMAT:
{
  "questions": [ "Question 1", "Question 2" ]
}
`;
    }

    if (interviewType === "Mixed") {
      prompt = `
You are conducting a mixed interview as a senior interviewer.

TASK:
Generate a mixed interview for "${companyName}" consisting of:
- 5 HR interview questions
- 10 Technical interview questions

GUIDELINES:
- The first HR question should be "Introduce yourself."
- The remaining HR questions should focus on communication, attitude, teamwork, ethics, and culture fit.
- Technical questions should gradually increase in difficulty:
  - start with a few warm-up questions
  - then move to deeper technical and problem-solving questions
- Take inspiration from the REFERENCE QUESTIONS to match topic, depth, and interview style.
- Do not repeat any reference question verbatim.
- Keep the flow realistic, as in an actual company interview.

RULES:
- Ask HR questions first, followed by Technical questions.
- Mix conceptual and practical technical questions.
- Do not add explanations or extra text.
- Return ONLY valid JSON.

HR REFERENCE QUESTIONS (FOR INSPIRATION):
${hrReferenceQuestions.join("\n")}

TECHNICAL REFERENCE QUESTIONS (FOR INSPIRATION):
${technicalReferenceQuestions.join("\n")}

OUTPUT FORMAT:
{
  "hrQuestions": [ "HR Q1", "HR Q2" ],
  "technicalQuestions": [ "Tech Q1", "Tech Q2" ]
}
`;
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
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
    console.error("===== GEMINI MOCK INTERVIEW ERROR =====");
    console.error(error.message);
    throw new Error("Mock interview generation failed");
  }
}
