import mongoose,{Schema} from "mongoose"


const userModel = new Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select: false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    testsAttempted:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestsModel",
    }],
    meetingsAttended:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MeetingModel",
    }]
}, {
    timestamps:true
})


export default mongoose.model("UserModel", userModel)