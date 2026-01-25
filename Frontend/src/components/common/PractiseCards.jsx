import { Grid } from "@mui/material";
import PracticeCard from "./PractiseCard";
import CalculateIcon from "@mui/icons-material/Calculate";
import PsychologyIcon from "@mui/icons-material/Psychology";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function PracticeCards() {
  return (
    <Grid container spacing={2} mb={5}>
      <PracticeCard
        icon={<CalculateIcon fontSize="large" />}
        title="Quantitative Aptitude"
        subtitle="Numbers, algebra, geometry"
        tags={["Number Systems", "Percentages", "Profit & Loss"]}
        link="/aptitude-questions/get-math-questions"
      />

      <PracticeCard
        icon={<PsychologyIcon fontSize="large" />}
        title="Logical Reasoning"
        subtitle="Puzzles, patterns, deduction"
        tags={["Series", "Coding-Decoding", "Blood Relations"]}
        link="/aptitude-questions/get-logical-questions"
      />

      <PracticeCard
        icon={<BarChartIcon fontSize="large" />}
        title="Engineering Basics"
        subtitle="OS, DBMS, Computer Networks"
        tags={["OS", "DBMS", "CN"]}
        link="/aptitude-questions/get-computer-questions"
      />
    </Grid>
  );
}
