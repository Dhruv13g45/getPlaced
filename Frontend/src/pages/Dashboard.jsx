import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardActionArea,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Divider,
} from "@mui/material";

import {
  TrendingUp,
  AssignmentOutlined,
  CodeOutlined,
  DescriptionOutlined,
  GroupOutlined,
  Calculate,
} from "@mui/icons-material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#6366F1" },
    secondary: { main: "#10B981" },
  },
  typography: { fontFamily: "Inter, sans-serif" },
});

const Dashboard = () => {
  const kpiData = [
    { label: "Aptitude Score", value: 72, trend: "+5", color: "#6366F1" },
    { label: "DSA Score", value: 58, trend: "+12", color: "#10B981" },
    { label: "Communication", value: 81, trend: "+3", color: "#F59E0B" },
  ];

  const quickActions = [
    { icon: <AssignmentOutlined />, label: "Start Mock", color: "#6366F1" },
    {
      icon: <DescriptionOutlined />,
      label: "Analyze Resume",
      color: "#10B981",
    },
    { icon: <CodeOutlined />, label: "Practice DSA", color: "#F59E0B" },
    { icon: <GroupOutlined />, label: "Book GD", color: "#EF4444" },
    { icon: <Calculate />, label: "Practice Aptitude", color: "#A855F7" },
  ];

  const upcomingSessions = [
    { title: "GD Practice Session", subtitle: "Nov 24, 5:00 PM", type: "gd" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          bgcolor: "#F9FAFB",
          display: "flex",
          justifyContent: "center",
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="md" sx={{ mx: "auto" }}>
          {/* Welcome Section */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                color: "#111827",
              }}
            >
              Welcome back, Rahul! 👋
            </Typography>
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
              }}
            >
              Let's continue your placement prep
            </Typography>
          </Box>

          {/* PI Cards */}
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {kpiData.map((kpi, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    py: 2,
                    pr: 17,

                    border: "1px solid #E5E7EB",
                    borderRadius: 2,
                    textAlign: "center",
                    bgcolor: "white",
                  }}
                >
                  <Typography sx={{ color: "#6B7280", mb: 1 }}>
                    {kpi.label}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: kpi.color,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      mb: 1,
                    }}
                  >
                    {kpi.value}%
                  </Typography>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}
                  >
                    <TrendingUp sx={{ fontSize: 18, color: "#10B981" }} />
                    <Typography sx={{ color: "#10B981" }}>
                      {kpi.trend} pts
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Quick Actions Section */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "#111827",
              }}
            >
              Quick Actions
            </Typography>

            <Grid container spacing={2.5}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      bgcolor: action.color,
                      color: "white",
                      borderRadius: 2.5,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardActionArea
                      sx={{
                        width: "100%",
                        height: "140px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1.5,
                        textAlign: "center",
                        p: 2.5,
                      }}
                    >
                      <Box sx={{ fontSize: { xs: 38, md: 42 } }}>
                        {action.icon}
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "0.95rem", md: "1.05rem" },
                          color: "white",
                        }}
                      >
                        {action.label}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Upcoming Sessions */}
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: "#111827",
              }}
            >
              Upcoming Sessions
            </Typography>

            <Box sx={{ maxWidth: "815px" }}>
              <Paper
                elevation={0}
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                  bgcolor: "white",
                }}
              >
                <List disablePadding>
                  {upcomingSessions.map((session, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        sx={{
                          px: 3.5,
                          py: 3,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            sx={{ bgcolor: "#FEF2F2", width: 56, height: 56 }}
                          >
                            <GroupOutlined sx={{ color: "#EF4444" }} />
                          </Avatar>
                        </ListItemAvatar>

                        <ListItemText
                          primary={
                            <Typography
                              sx={{ fontWeight: 600, paddingLeft: "10px" }}
                            >
                              {session.title}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              sx={{ color: "#6B7280", paddingLeft: "10px" }}
                            >
                              {session.subtitle}
                            </Typography>
                          }
                        />

                        <Box sx={{ marginLeft: "auto" }}>
                          <Button
                            variant="contained"
                            sx={{
                              textTransform: "none",
                              px: 3,
                              outline: "none",
                              boxShadow: "none",
                              "&:focus": { outline: "none" },
                              "&:focus-visible": { outline: "none" },
                              "&:active": { outline: "none" },
                            }}
                          >
                            Join
                          </Button>
                        </Box>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
