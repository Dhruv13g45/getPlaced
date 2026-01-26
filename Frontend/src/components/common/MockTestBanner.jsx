import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MockTestBanner() {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate("/aptitude-questions/mock")}
      sx={{
        p: 4,
        borderRadius: 1,
        background: "linear-gradient(90deg, #6a5cff, #8e5cff)",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        cursor: "pointer",

        // subtle hover effect
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight={600}>
          Take a Full Mock Test
        </Typography>
        <Typography variant="body2">
          Test your skills with a comprehensive aptitude test
        </Typography>
      </Box>

      {/* Button kept only for visual clarity */}
      <Button
        variant="contained"
        sx={{
          bgcolor: "#fff",
          color: "#6a5cff",
          fontWeight: 600,
          pointerEvents: "none", // important: avoid double click logic
          "&:hover": { bgcolor: "#f1f1f1" },
        }}
      >
        Start Mock Test
      </Button>
    </Box>
  );
}
