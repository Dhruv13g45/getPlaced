import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { connectToServer } from "./controllers/socketManager.js";
<<<<<<< HEAD
import resumeRoutes from "./routes/resume.routes.js";
=======
import connectDB from "./db/db.js";
import TestRouter from "./routes/tests.routes.js"
import seedQuestionsInDatabase from "./utils/seedQuestions.js";
import questionsModel from "./models/questions.model.js";
>>>>>>> 24a594a55e14b4f517295ef1fec9e3672d22a669

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const io = connectToServer(server);
const PORT = process.env.PORT || 5000;



const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected");

    const questionCount = await questionsModel.countDocuments();

    if (questionCount === 0) {
      console.log("Extracting questions");
      await seedQuestionsInDatabase();
      console.log("Questions extracted and saved in database successfully");
    }

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();

<<<<<<< HEAD
app.use("/api/resume", resumeRoutes);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======

app.use("/aptitude-questions", TestRouter)
>>>>>>> 24a594a55e14b4f517295ef1fec9e3672d22a669
