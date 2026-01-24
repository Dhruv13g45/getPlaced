import "../ResumeAnalyzer.css";
import React, { useState } from "react";

import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Chip,
    Divider,
    LinearProgress
} from "@mui/material";

import {
    CloudUploadOutlined,
    CheckCircleOutline,
    HighlightOff,
    LightbulbOutlined,
    InsertDriveFileOutlined,
    AutoAwesome
} from "@mui/icons-material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: { main: "#6366F1" },
        secondary: { main: "#10B981" },
    },
    typography: { fontFamily: "Inter, sans-serif" },
});

const ResumeAnalyzer = () => {
    const [analyzed, setAnalyzed] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [atsScore, setAtsScore] = useState(0);
    const [keywordMatch, setKeywordMatch] = useState(0);
    const [formatting, setFormatting] = useState(0);
    const [suggestions, setSuggestions] = useState([]);

    // 🔹 API CALL
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://localhost:5000/api/resume/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            setAtsScore(data.atsScore);
            setKeywordMatch(data.breakdown.keywordMatch);
            setFormatting(data.breakdown.formatting);
            setSuggestions(data.suggestions);

            setAnalyzed(true);
        } catch (err) {
            console.error(err);
            alert("Resume analysis failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className="resume-root" py={{ xs: 3, md: 5 }}>
                <Container maxWidth="md">

                    {/* Header */}
                    <Box mb={5}>
                        <Typography
                            variant="h5"
                            className="page-title"
                            fontWeight={700}
                            mb={1}
                            color="#111827"
                        >
                            Resume Analyzer 📄
                        </Typography>
                        <Typography color="#6B7280">
                            Check your ATS score and get instant feedback.
                        </Typography>
                    </Box>

                    {!analyzed ? (
                        /* Upload State */
                        <Paper
                            elevation={0}
                            className="upload-box"
                            sx={{
                                p: 6,
                                border: "2px dashed #E5E7EB",
                                borderRadius: 2,
                                bgcolor: "white",
                                textAlign: "center"
                            }}
                        >
                            <CloudUploadOutlined sx={{ fontSize: 48, color: "#6366F1", mb: 2 }} />

                            <Typography variant="h6" fontWeight={600}>
                                {uploading ? "Analyzing..." : "Upload your Resume"}
                            </Typography>

                            <Typography color="#6B7280" mb={2}>
                                PDF or DOCX supported
                            </Typography>

                            {uploading ? (
                                <LinearProgress sx={{ height: 8, borderRadius: 4 }} />
                            ) : (
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{ textTransform: "none", px: 5 }}
                                >
                                    Select File
                                    <input hidden type="file" accept=".pdf,.docx" onChange={handleUpload} />
                                </Button>
                            )}
                        </Paper>
                    ) : (
                        /* Results */
                        <Box className="fade-in">

                            {/* Scores */}
                            <Grid container spacing={3} mb={5}>
                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 3 }}>
                                        <Typography color="#6B7280">ATS Score</Typography>
                                        <Typography variant="h3" className="ats-score">
                                            {atsScore}<span style={{ fontSize: "1.5rem", color: "#9CA3AF" }}>/100</span>
                                        </Typography>
                                        <Chip label="Good Job!" sx={{ mt: 1 }} />
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 2, mb: 2 }}>
                                        <Typography>Keywords Match</Typography>
                                        <LinearProgress value={keywordMatch} variant="determinate" />
                                    </Paper>
                                    <Paper sx={{ p: 2 }}>
                                        <Typography>Formatting</Typography>
                                        <LinearProgress value={formatting} variant="determinate" color="secondary" />
                                    </Paper>
                                </Grid>
                            </Grid>

                            {/* Suggestions */}
                            <Paper>
                                <List>
                                    {suggestions.map((item, idx) => (
                                        <React.Fragment key={idx}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        {item.type === "critical" && <HighlightOff />}
                                                        {item.type === "warning" && <LightbulbOutlined />}
                                                        {item.type === "good" && <CheckCircleOutline />}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={item.title}
                                                    secondary={item.desc}
                                                />
                                                <Chip label={item.type} />
                                            </ListItem>
                                            {idx < suggestions.length - 1 && <Divider />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>

                            <Box textAlign="center" mt={4}>
                                <Button onClick={() => setAnalyzed(false)}>
                                    Analyze another resume
                                </Button>
                            </Box>

                        </Box>
                    )}
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default ResumeAnalyzer;
