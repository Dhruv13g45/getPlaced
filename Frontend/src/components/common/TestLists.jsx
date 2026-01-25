import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, CardContent, Button } from "@mui/material";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Routes, Route, useNavigate } from "react-router-dom";
import Test from "../../pages/Test.jsx";

export default function TestLists({ category }) {

    const navigate = useNavigate()
    const [questions, setQuestions] = useState([]);
    const [tests, setTests] = useState({})

    const splitInTests = () => {
        const questionsPerTest = 20;

        let testObj = {};
        let questionsCount = 0;
        let questionArray = [];
        let testNumber = 0;

        for (let i = 0; i < questions.length; i++) {
            questionArray.push(questions[i]);
            questionsCount++;

            if (questionsCount === questionsPerTest) {
                testNumber++;
                testObj["Test" + testNumber] = questionArray;
                questionArray = [];
                questionsCount = 0;
            }
        }

        if (questionsCount > 0 && questionsCount >= 10) {
            testNumber++;
            testObj["Test" + testNumber] = questionArray;
        }

        setTests(testObj);

    }


    const navigateToTest = (testId) => {
        navigate(`/${testId}`)
    }


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:8000/aptitude-questions/get-${category}-questions`
                );
                const questionsData = await res?.data?.data?.allQuestions
                const questionsArray = Object.values(questionsData)

                setQuestions(questionsArray)

            } catch (err) {
                console.error(err);
            }
        };

        fetchQuestions();
    }, [category]);


    useEffect(() => {
        if (questions.length > 0) {
            splitInTests();
        }
    }, [questions]);


    console.log(tests)


    return (
        <>
            <Typography variant="h5" mb={2}>
                {category.toUpperCase()} Tests
            </Typography>

            {Object.entries(tests).map(([testName, questions], i) => (
                <Card key={testName}>
                    {
                    console.log(testName, questions, i)
                    }
                    <span>
                        <NoteAltIcon />
                        {testName}
                    </span>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: "#fff",
                            color: "#6a5cff",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#f1f1f1" },
                        }}
                        onClick={() => navigateToTest(testName)}
                    >
                        Start Mock Test
                    </Button>
                </Card>
            ))}


        </>
    );
}
