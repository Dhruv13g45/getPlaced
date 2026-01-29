import userModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomApiError from "../utils/customApiError.js";
import CustomApiResponse from "../utils/customApiResponse.js";
import hashPassword from "../utils/hashPassword.js";

const loginUser = asyncHandler(async (req, res)=>{
    const email = req.body.email

    const password = req.body.password

    if(!email && !password){
        throw new CustomApiError("Email and password both are required !!", 404)
    }

    const alreadyExistingUser = await userModel.find({email:email})

    if (!alreadyExistingUser){
        throw new CutomApiError("User not found, Please register !!", 404)
    }

    const samePasswordCheck = await bcrypt.compare(password, alreadyExistingUser?.password)

    if (!samePasswordCheck){
        throw new CustomApiError("The password is not same !!", 300)
    }

    return new CustomApiResponse("User Logged In successfully !!", 200, alreadyExistingUser)
})


const createUser = asyncHandler(async (req, res) =>{
    const username = req.body.name

    const password = req.body.password

    const email = req.body.email

    if (!username && !password && !email){
        throw new CustomApiError("All feilds are mandatory to enter", 404)
    }

    const emailRegex = "/^[a-zA-Z0-9._]+@ves\.ac\.in$/"

    if(!emailRegex.test(email)){
        throw new CustomApiError("Mail does not match institution mail pattern", 349)
    }

    const hashedPassword = await hashPassword(password)

    if(!hashedPassword){
        throw new CustomApiError("Couldn't find the hashed password !!", 404)
    }

    const alreadyUser = await userModel.find({email:email})

    if(alreadyUser){
        throw new CustomApiError("User already exists, Please Login !!", 300)
    }

    const user = {
        username: username,
        password: hashedPassword,
        email: email,
    }
    try {
        const newUser = await userModel.create(user)
        console.log("Created a user successfully !!")

        return new CustomApiError("Created user successfully", 200, newUser)

    } catch (error) {
        throw new CustomApiError("Error while creaqting creating a user !!", 500)
    }


})


const logoutUser = asyncHandler((req, res) =>{})


export {
    loginUser,
    createUser,
    logoutUser,
}