import express from "express";
import {
  getAllMockInterviewCompanies,
  startMockInterview,
} from "../controllers/mockInterview.controller.js";

const router = express.Router();

router.get("/", getAllMockInterviewCompanies);
router.post("/start", startMockInterview);

export default router;
