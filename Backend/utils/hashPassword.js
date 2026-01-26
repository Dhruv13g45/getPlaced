import bcrypt from "bcrypt"
import CustomApiError from "./customApiError"

const hashPassword = async (userPassword) =>{

    if (!userPassword){
        throw new CustomApiError("Couldn't get the user password to hash it !!", 404)
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(userPassword, salt)

    return hashedPassword
}


export default hashPassword