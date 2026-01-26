import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import CalculateIcon from "@mui/icons-material/Calculate";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";

const cards = [
  {
    title: "Quantitative Aptitude",
    subtitle: "Numbers, algebra, geometry",
    category: "math",
    icon: <CalculateIcon sx={{ color: "#2563eb" }} />,
    iconBg: "#dbeafe",
    chips: ["Number Systems", "Percentages", "Profit & Loss"],
  },
  {
    title: "Logical Reasoning",
    subtitle: "Puzzles, patterns, deduction",
    category: "logical",
    icon: <PsychologyIcon sx={{ color: "#a855f7" }} />,
    iconBg: "#f3e8ff",
    chips: ["Series", "Coding-Decoding", "Blood Relations"],
  },
  {
    title: "Computer Aptitude",
    subtitle: "CN, DBMS, OS",
    category: "computer",
    icon: <SpellcheckIcon sx={{ color: "#ca8a04" }} />,
    iconBg: "#fef3c7",
    chips: ["OS", "CN", "DBMS"],
  },
];

export default function PracticeCards() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3} mt={2} mb={2}>
      {cards.map((card) => (
        <Grid item xs={12} md={6} key={card.category}>
          <Card
            onClick={() => navigate(`/aptitude-questions/${card.category}`)}
            sx={{
              width:"auto",
              height: "auto",
              cursor: "pointer",
              borderRadius: 1,
              transition: "0.25s ease",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardContent>
              {/* Top row */}
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: "auto",
                    height: "auto",
                    borderRadius: 2,
                    backgroundColor: card.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                  }}
                >
                  {card.icon}
                </Box>

                <Box>
                  <Typography fontWeight={600}>
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {card.subtitle}
                  </Typography>
                </Box>
              </Box>

              {/* Chips */}
              <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                {card.chips.map((chip) => (
                  <Chip
                    key={chip}
                    label={chip}
                    size="small"
                    sx={{
                      backgroundColor: "#f3f4f6",
                      fontSize: 12,
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
