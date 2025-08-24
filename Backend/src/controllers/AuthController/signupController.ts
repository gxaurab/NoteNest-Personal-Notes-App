import { Request, Response } from "express"

import bcrypt from 'bcrypt'
import User from "../../models/userModel"

const signupController = async (req:Request, res: Response)=>{
    const {username, email, password} = req.body
    const hashedPassword =  await bcrypt.hash(password, 10)
    try {
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(200).json({message: "User Registered Successfully"})
    } catch (error) {
        console.error(error);
        res.status(400).json({message: "Error Registering User"})
    }
}


export default signupController