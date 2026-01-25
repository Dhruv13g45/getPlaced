import { Container, Typography } from "@mui/material";
import PracticeCards from "../components/common/PractiseCards";
import MockTestBanner from "../components/common/MockTestBanner";
import { Routes, Route } from "react-router-dom";
import TestLists from "../components/common/TestLists";
import Test from "./Test";

export default function AptitudePractice() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={600}>
        Practice Aptitude
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Improve your quantitative and logical reasoning skills
      </Typography>

      {/* visible on main aptitude page */}
      <PracticeCards />
      <MockTestBanner />

      {/* nested routes */}
      <Routes>
        <Route path=":category" element={<TestLists />} />
        <Route path=":category/test/:testId" element={<Test />} />
      </Routes>
    </Container>
  );
}
