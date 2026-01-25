import customApiError from "../utils/customApiError.js"
import asyncHandler from "../utils/asyncHandler.js"
import questionsModel from "../models/questions.model.js"
import customApiResponse from "../utils/customApiResponse.js"

const getAllQuestions = async (req, res) => {
    // const user = req.user

    // if(!user) {
    //     throw new CustomApiError("User not found !!", 404)
    // }

    const allQuestions = await questionsModel.find().select("-correctAnswer")

    console.log(allQuestions)

    return res.status(200).json(
        new customApiResponse("Sucessfully retrived mock questions !!", 200, { allQuestions })
    )
}

const getMathQuestions = asyncHandler(async (req, res) => {
    // const user = req.user

    // if(!user) {
    //     throw new CustomApiError("User not found !!", 404)
    // }

    const allQuestions = await questionsModel.find({ category: "math" }).select("-correctAnswer")

    console.log(allQuestions)

    return res.status(200).json(
        new customApiResponse("Sucessfully retrived math questions !!", 200, { allQuestions })
    )
})

const getLogicalQuestions = async (req, res) => {
    // const user = req.user

    // if(!user) {
    //     throw new CustomApiError("User not found !!", 404)
    // }

    const allQuestions = await questionsModel.find({ category: "logical" }).select("-correctAnswer")

    console.log(allQuestions)

    return res.status(200).json(
        new customApiResponse("Sucessfully retrived logical questions !!", 200, { allQuestions })
    )
}

const getComputerQuestions = async (req, res) => {
    // const user = req.user

    // if(!user) {
    //     throw new CustomApiError("User not found !!", 404)
    // }

    const allQuestions = await questionsModel.find({ category: "computer" }).select("-correctAnswer")

    console.log(allQuestions)

    return res.status(200).json(
        new customApiResponse("Sucessfully retrived computer questions !!", 200, { allQuestions })
    )
}


const submitTest = async (req, res) => {
    const { answers } = req.body;

    let score = 0;

    for (const questionId in answers) {
        const userAnswer = answers[questionId];

        const question = await questionsModel.findById(questionId);

        console.log(question)

        if (!question) continue;

        if (userAnswer === question.correctAnswer) {
            score += 1;
        }
    }


    return res.status(200).json(
        new customApiResponse("Successfully assigned the scores", 200, { score })
    )
}


export {
    getAllQuestions,
    getComputerQuestions,
    getLogicalQuestions,
    getMathQuestions,
    submitTest,
}

