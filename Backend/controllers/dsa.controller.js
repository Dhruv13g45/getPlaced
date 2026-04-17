import DsaQuestionModel from "../models/dsaQuestion.model.js"
import CustomApiError from "../utils/customApiError.js"
import CustomApiResponse from "../utils/customApiResponse.js"

const getTopicWiseDSAQuestions = async(req,res)=>{

    const {topic} = req.body

    if(!topic){
        throw new CustomApiError("Topic is required to fetch questions !!", 400)
    }
    
    const topicWiseQuestions = await DsaQuestionModel.find(
        {topics:topic}
    ).select("-problemDescription -inputConstraints -examples -hints -starterCode")

    if (!topicWiseQuestions || topicWiseQuestions.length === 0) {
        throw new CustomApiError("No questions found for the specified topic", 404)
    }

    console.log(topicWiseQuestions)

    return res.status(200).json(
        new CustomApiResponse("Successfully retrieved topic-wise questions !!", 200, { topicWiseQuestions })
    )
}

const getDSATopics = async(req,res) =>{
    

    console.log("Finding.....")
    const questions = await DsaQuestionModel.find()

    const allQuestionsTopics = (questions.map((singleQuestion)=>{
        return(
            singleQuestion?.topics
        )
    })).flat()


    const allUniqueTopics = [...new Set(allQuestionsTopics)] //gives uniques topics

    console.log(allUniqueTopics)

    if (allUniqueTopics.length === 0){
        throw new CustomApiError("Topics could not be fetched", 500)
    }

    return res.status(200).json(
        new CustomApiResponse("Successfully retrieved all DSA topics !!", 200, { allUniqueTopics })
    )
}

const getSingleDSAQuestion = async(req,res) =>{
    const {questionId} = req.query


    if(!questionId){
        throw new CustomApiError("Couldn't fetch question details without questionId !!", 400)
    }

    const dsaQuestion = await DsaQuestionModel.findById(questionId)

    if(!dsaQuestion){
        throw new CustomApiError("Couldn't fetch the question from database !!", 500)
    }


    console.log(dsaQuestion)

    return res.status(200).json(
        new CustomApiResponse("Successfully retrieved the question details !!", 200, { dsaQuestion })
    )
}




export {
    getTopicWiseDSAQuestions,
    getDSATopics,
    getSingleDSAQuestion,
}