import MockInterview from "../models/mockInterview.model.js";
import { generateMockInterviewQuestions } from "../services/geminiMockInterview.service.js";


//GET all companies 
export const getAllMockInterviewCompanies = async (req, res) => {
  try {
    const companies = await MockInterview.find();
    return res.status(200).json(companies);
  } catch (error) {
    console.error("Fetch Companies Error:", error);
    return res.status(500).json({
      message: "Failed to fetch companies",
    });
  }
};

//POST start mock interview
export const startMockInterview = async (req, res) => {
  try {
    const { companyName, interviewType } = req.body;

    if (!companyName || !interviewType) {
      return res.status(400).json({
        message: "companyName and interviewType are required",
      });
    }

    const company = await MockInterview.findOne({ companyName });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    // ✅ FETCH QUESTIONS STRICTLY FROM YOUR MODEL
    const hrReferenceQuestions = company.rounds
      .filter((round) => round.roundType === "HR")
      .flatMap((round) => round.questions);

    const technicalReferenceQuestions = company.rounds
      .filter((round) => round.roundType === "Technical")
      .flatMap((round) => round.questions);

    const geminiResponse = await generateMockInterviewQuestions({
      companyName,
      interviewType,
      hrReferenceQuestions,
      technicalReferenceQuestions,
    });

    let finalQuestions = [];

    if (interviewType === "HR") {
      finalQuestions = geminiResponse.questions;
    }

    if (interviewType === "Technical") {
      finalQuestions = geminiResponse.questions;
    }

    if (interviewType === "Mixed") {
      finalQuestions = [
        ...geminiResponse.hrQuestions,
        ...geminiResponse.technicalQuestions,
      ];
    }

    return res.status(200).json({
      companyName,
      interviewType,
      totalQuestions: finalQuestions.length,
      questions: finalQuestions,
    });
  } catch (error) {
    console.error("Start Mock Interview Error:", error);
    return res.status(500).json({
      message: "Failed to start mock interview",
    });
  }
};
