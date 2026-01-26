import {Schema} from "mongoose";

const meetingSchema=new Schema(
    {
        username:{type:String,required:true},
        meeting_code:{type:String,required:true},
        date:{type:Date,default:Date.now}
    }
)

const Meeting=mongoose.model("MeetingModel",meetingSchema);
export default Meeting;