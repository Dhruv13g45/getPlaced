// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(
//   process.env.GEMINI_RESUME_ANALYZER_API_KEY,
// );

// export const analyzeResumeWithGemini = async (resumeText) => {
//   try {
//     console.log(
//       "Resume Gemini key loaded:",
//       !!process.env.GEMINI_RESUME_ANALYZER_API_KEY,
//     );

//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const prompt = `
// You are an ATS resume analyzer.

// Return ONLY valid JSON in this exact format:
// {
//   "atsScore": number,
//   "keywordMatch": number,
//   "formattingScore": number,
//   "suggestions": [
//     { "title": string, "desc": string, "type": "critical" | "warning" | "good" }
//   ]
// }

// Resume text:
// ${resumeText.slice(0, 5000)}
// `;

//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = response.text();

//     return JSON.parse(text);
//   } catch (err) {
//     console.error("====== GEMINI ERROR ======");
//     console.error(err.message);
//     console.error("==========================");

//     throw new Error("Gemini analysis failed");
//   }
// };
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_RESUME_ANALYZER_API_KEY,
});

export async function analyzeResumeWithGemini(resumeText) {
  try {
    console.log(
      "Resume Gemini key loaded:",
      !!process.env.GEMINI_RESUME_ANALYZER_API_KEY,
    );

    const prompt = `
You are an ATS resume analyzer.

Return ONLY valid JSON in this exact format:
{
  "atsScore": number,
  "keywordMatch": number,
  "formattingScore": number,
  "suggestions": [
    { "title": string, "desc": string, "type": "critical" | "warning" | "good" }
  ]
}

Resume text:
${resumeText.slice(0, 5000)}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const rawText = result.text;

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);

    return JSON.parse(result.text);
  } catch (err) {
    console.error("====== GEMINI RESUME ERROR ======");
    console.error(err);
    console.error("================================");
    throw new Error("Gemini resume analysis failed");
  }
}
