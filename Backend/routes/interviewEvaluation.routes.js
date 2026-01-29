import express from "express";
import { evaluateInterview } from "../controllers/interviewEvaluation.controller.js";

const router = express.Router();

//POST /api/interview/evaluate 
router.post("/evaluate", evaluateInterview);

export default router;
