import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TestLists from "../components/common/TestLists";

const titles = {
  quantitative: "Quantitative Aptitude",
  logical: "Logical Reasoning",
  math: "Computer Aptitude",
};

export default function CategoryTests() {
  const { category } = useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600} mb={2}>
        {titles[category] || "Aptitude Tests"}
      </Typography>

      <TestLists category={category} />
    </Container>
  );
}
