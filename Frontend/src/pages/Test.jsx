import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  CircularProgress,
} from "@mui/material";

export default function Test() {
  const { category, testName } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false); // 🔥 NEW
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!category || !testName) return;

    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:8000/aptitude-questions/get-${category}-questions`
        );

        const allQuestions = Object.values(
          res.data.data.allQuestions
        ).map((q) => ({
          ...q,
          options: q.options
            ? Object.entries(q.options).map(([key, value]) => ({
                key,
                value,
              }))
            : [],
        }));

        const QUESTIONS_PER_TEST = 20;
        const testNumber = parseInt(testName.replace("Test", ""));
        const startIndex = (testNumber - 1) * QUESTIONS_PER_TEST;
        const endIndex = startIndex + QUESTIONS_PER_TEST;

        setQuestions(allQuestions.slice(startIndex, endIndex));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, testName]);

  if (loading) return <Typography>Loading questions...</Typography>;
  if (!questions.length)
    return <Typography>No questions available.</Typography>;

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (questionId, optionKey) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  // 🔥 BACKEND-DRIVEN SUBMIT WITH LOADER
  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const res = await axios.post(
        "http://localhost:8000/aptitude-questions/submit-test",
        { answers }
      );

      setScore(res?.data?.data?.score);
      setSubmitted(true);
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleExit = () => {
    navigate(`/aptitude-questions/${category}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {category.toUpperCase()} {testName} – Question{" "}
        {currentQuestionIndex + 1} of {questions.length}
      </Typography>

      {/* 🔥 SUBMITTING LOADER */}
      {submitting && (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={26} />
            <Typography fontWeight={500}>
              Evaluating your answers…
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* ✅ SCORE CARD */}
      {submitted && !submitting && (
        <Card sx={{ mb: 3, bgcolor: "#f0fdf4" }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              Test Submitted ✅
            </Typography>
            <Typography>
              Score: <b>{score}</b>
            </Typography>
          </CardContent>
        </Card>
      )}

      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ mb: 2 }}>
            {currentQuestion.question}
          </Typography>

          <RadioGroup
            value={answers[currentQuestion._id] || ""}
            onChange={(e) =>
              handleAnswerSelect(
                currentQuestion._id,
                e.target.value
              )
            }
          >
            {currentQuestion.options.map((opt) => (
              <FormControlLabel
                key={opt.key}
                value={opt.key}
                control={<Radio />}
                label={`${opt.key}: ${opt.value}`}
                disabled={submitted}
              />
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          disabled={currentQuestionIndex === 0 || submitted}
          onClick={() => setCurrentQuestionIndex((i) => i - 1)}
        >
          Previous
        </Button>

        <Button
          variant="contained"
          disabled={
            currentQuestionIndex === questions.length - 1 ||
            submitted
          }
          onClick={() => setCurrentQuestionIndex((i) => i + 1)}
        >
          Next
        </Button>

        {!submitted && (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={submitting}
          >
            Submit Test
          </Button>
        )}

        <Button
          variant="outlined"
          color="error"
          onClick={handleExit}
        >
          Exit
        </Button>
      </Box>
    </Box>
  );
}
