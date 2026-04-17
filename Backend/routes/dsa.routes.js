import Router from "express"
import {getTopicWiseDSAQuestions, getDSATopics, getSingleDSAQuestion} from "../controllers/dsa.controller.js"


const router = Router()

router.get("/get-dsa-topics", getDSATopics),
router.post("/get-topic-wise-dsa-questions", getTopicWiseDSAQuestions)
router.post("/get-single-dsa-question", getSingleDSAQuestion)


export default router