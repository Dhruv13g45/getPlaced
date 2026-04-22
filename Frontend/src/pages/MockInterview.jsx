import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MockInterview = () => {
  const { state } = useLocation();
  const { companyName, interviewType, questions } = state;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [responses, setResponses] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const navigate = useNavigate();

  // ---------- TEXT TO SPEECH ----------
  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (currentQuestion) speakText(currentQuestion);
  }, [currentQuestion]);

  // ---------- SPEECH TO TEXT ----------
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  }

  const startRecording = () => {
    if (!recognition) {
      alert("Speech Recognition not supported");
      return;
    }
    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer((prev) => prev + " " + transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  };

  const stopRecording = () => {
    if (recognition) recognition.stop();
    setIsRecording(false);
  };

  // ---------- NEXT / FINISH ----------
  const handleNext = () => {
    const updatedResponses = [
      ...responses,
      { question: currentQuestion, answer },
    ];

    setResponses(updatedResponses);
    setAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      submitForEvaluation(updatedResponses);
    }
  };

  // ---------- EVALUATION ----------

  const submitForEvaluation = async (finalResponses) => {
    try {
      setIsEvaluating(true);
      console.log("final response:", finalResponses);

      const res = await axios.post(
        "http://localhost:8000/api/interview/evaluate",
        {
          companyName,
          interviewType,
          responses: finalResponses,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setEvaluation(res.data);
    } catch (error) {
      console.error("Evaluation failed", error);
    } finally {
      setIsEvaluating(false);
    }
  };
  const resultCardStyle = {
    backgroundColor: "#fff",
    borderRadius: "18px",
    padding: 3,
    border: "1px solid #e5e7eb",
  };

  // ---------- LOADING VIEW ----------
  if (isEvaluating) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={700}>
          Evaluating your interview...
        </Typography>
        <LinearProgress sx={{ mt: 4 }} />
      </Container>
    );
  }

  // ---------- RESULT VIEW ----------
  if (evaluation) {
    return (
      <Container maxWidth={false} sx={{ maxWidth: 1200, mt: 6, mb: 8 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          <span style={{ color: "#4f46e5" }}>Interview</span> Result
        </Typography>

        {/* Score Card */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            color: "#fff",
            borderRadius: "20px",
            p: 4,
            mb: 4,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {evaluation.overallScore}/10
          </Typography>
          <Typography sx={{ opacity: 0.9 }}>
            Verdict: {evaluation.verdict}
          </Typography>
        </Box>

        {/* Feedback Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // ✅ ONE CARD PER ROW
            gap: 3,
            width: "100%",
          }}
        >
          <Box sx={resultCardStyle}>
            <Typography fontWeight={600} mb={1}>
              ✅ Strengths
            </Typography>
            <ul>
              {evaluation.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Box>

          <Box sx={resultCardStyle}>
            <Typography fontWeight={600} mb={1}>
              ⚠️ Weaknesses
            </Typography>
            <ul>
              {evaluation.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </Box>

          <Box sx={resultCardStyle}>
            <Typography fontWeight={600} mb={1}>
              🚀 Suggestions
            </Typography>
            <ul>
              {evaluation.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{
            mt: 5,
            height: 52,
            borderRadius: "14px",
            textTransform: "none",
            backgroundColor: "#4f46e5",
          }}
          onClick={() => navigate("/mock-interviews")}
        >
          Cancel
        </Button>
      </Container>
    );
  }

  // ---------- INTERVIEW VIEW ----------
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Typography variant="h5" fontWeight={700} mb={1}>
        <span style={{ color: "#4f46e5" }}>{companyName}</span> ·{" "}
        {interviewType} Interview
      </Typography>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 8, borderRadius: 6, mb: 4 }}
      />

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "18px",
          padding: 4,
          border: "1px solid #e5e7eb",
          mb: 3,
        }}
      >
        <Typography fontWeight={600} mb={2}>
          Question {currentIndex + 1} of {questions.length}
        </Typography>

        <Typography fontSize="1.1rem">{currentQuestion}</Typography>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={5}
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        sx={{
          mb: 3,
          "& .MuiOutlinedInput-root": { borderRadius: "14px" },
        }}
      />

      <Button
        onClick={isRecording ? stopRecording : startRecording}
        sx={{
          mb: 3,
          textTransform: "none",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          color: isRecording ? "#dc2626" : "#4f46e5",
        }}
      >
        {isRecording ? "⏹ Stop Recording" : "🎤 Record Answer"}
      </Button>
      <Button
        fullWidth
        onClick={handleNext}
        disabled={!answer.trim()}
        sx={{
          height: 56,
          borderRadius: "14px",
          backgroundColor: "#4f46e5",
          color: "#fff",
          fontWeight: 600,
          textTransform: "none",
          mb: 8,
          "&:hover": { backgroundColor: "#4338ca" },
        }}
      >
        {currentIndex === questions.length - 1
          ? "Finish Interview"
          : "Next Question"}
      </Button>
    </Container>
  );
};

export default MockInterview;
