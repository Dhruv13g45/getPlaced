import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout/Layout';

import Dashboard from './pages/Dashboard';
// import MockInterview from './pages/MockInterview';
// import DSAPractice from './pages/DSAPractice';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
// import GroupDiscussion from './pages/GroupDiscussion';
// import SettingsPage from './pages/SettingsPage';


const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5', // Indigo
    },
    secondary: {
      main: '#10b981', // Emerald
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            {/* <Route path="mock-interviews" element={<MockInterview />} />
            <Route path="dsa-practice" element={<DSAPractice />} /> */}
            <Route path="resume" element={<ResumeAnalyzer />} />
            {/* <Route path="group-discussion" element={<GroupDiscussion />} />
            <Route path="settings" element={<SettingsPage />} /> */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;