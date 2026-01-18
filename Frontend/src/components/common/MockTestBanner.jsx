import { Box, Typography, Button } from "@mui/material";

export default function MockTestBanner() {
  return (
    <Box
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

      <Button
        variant="contained"
        sx={{
          bgcolor: "#fff",
          color: "#6a5cff",
          fontWeight: 600,
          "&:hover": { bgcolor: "#f1f1f1" },
        }}
      >
        Start Mock Test
      </Button>
    </Box>
  );
}
