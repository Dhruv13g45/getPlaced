// resume.routes.js
import express from "express";
import upload from "../middlewares/resumeUpload.middleware.js";
import { analyzeResume } from "../controllers/resume.controller.js";
//import verifyUser from "../middlewares/verifyUser.middleware.js";

const router = express.Router();

router.post(
  "/analyze",
  //verifyUser, // optional but recommended
  upload.single("file"),
  analyzeResume,
);

export default router;
