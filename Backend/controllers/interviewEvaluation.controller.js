import { evaluateMockInterview } from "../services/geminiInterviewEvaluation.service.js";

export const evaluateInterview = async (req, res) => {
  try {
    const { companyName, interviewType, responses } = req.body;

    // validation
    if (!companyName || !interviewType || !responses?.length) {
      return res.status(400).json({
        message: "Invalid evaluation request",
      });
    }

    const evaluation = await evaluateMockInterview({
      companyName,
      interviewType,
      responses,
    });

    return res.status(200).json(evaluation);
  } catch (error) {
    console.error("Interview Evaluation Error:", error);

    return res.status(500).json({
      message: "Failed to evaluate interview",
    });
  }
};
