import { Grid } from "@mui/material";
import PracticeCard from "./PractiseCard";
import CalculateIcon from "@mui/icons-material/Calculate";
import PsychologyIcon from "@mui/icons-material/Psychology";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function PracticeCards() {
  return (
    <Grid container spacing={2} mb={5}>
      <PracticeCard
        icon={<CalculateIcon />}
        title="Quantitative Aptitude"
        subtitle="Numbers, algebra, geometry"
        tags={["Number Systems", "Percentages", "Profit & Loss"]}
        link="/math-questions"
      />

      <PracticeCard
        icon={<PsychologyIcon />}
        title="Logical Reasoning"
        subtitle="Puzzles, patterns, deduction"
        tags={["Series", "Coding-Decoding", "Blood Relations"]}
        link="/logical-questions"
      />

      <PracticeCard
        icon={<BarChartIcon />}
        title="Engineering Basics"
        subtitle="OS, DBMS, Computer Networks"
        tags={["OS", "DBMS", "CN"]}
        link="/engineering-questions"
      />
    </Grid>
  );
}
