import { Container, Typography } from "@mui/material";
import PracticeCards from "../components/common/PractiseCards";
import MockTestBanner from "../components/common/MockTestBanner";

export default function AptitudePractice() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600}>
        Practice Aptitude
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Improve your quantitative and logical reasoning skills
      </Typography>

      <PracticeCards />
      <MockTestBanner />
    </Container>
  );
}
