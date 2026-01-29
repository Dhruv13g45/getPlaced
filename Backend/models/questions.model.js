import mongoose,{Schema} from "mongoose"

const questionsModel = new Schema({
    question:{
        type: String,
        required:true
    },
    options: {
      A: { type: String, required: true },
      B: { type: String, required: true },
      C: { type: String, required: true },
      D: { type: String, required: true },
    },
    correctAnswer:{
        type: String,
        enum: ["A", "B", "C", "D"],
        required: true,
    },
    category: {
      type: String,
      enum: ["math", "logical", "computer", "mock"],
      required: true,
    },

}, {
    timestamps:true
})


export default mongoose.model("QuestionsModel", questionsModel)