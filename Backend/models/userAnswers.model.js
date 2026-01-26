import mongoose,{Schema} from "mongoose"

const userAnswersModel = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
    },
    testId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestsModel",
        required:true
    },
    answers:[{
        questionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuestionsModel",
        },
        selectedOption:{
            type:String,
            enum: ["A", "B", "C", "D"]
        }
    }],
    isCorrect:{
        type: Boolean,
    }
}, {
    timestamps:true
})

export default mongoose.model("UserAnswersModel", userAnswersModel)