// get the username and password
// search if it exists, if not return message
// if exists get the password and compare the password
// after successful comparision generate a new JWT token and send in the response

import { Request, Response } from "express"
import User from "../../models/userModel"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dotenv from "dotenv";
dotenv.config();

const loginController = async (req:Request, res: Response) => {

    const {username, password} = req.body

    try {
        const getUser = await User.findOne({
            username
        })
        const hashedPassword = getUser?.password as string
        if(!getUser){
            res.status(400).json({ "message": "Cant find user with that username"})
            return
        }   
        const match = bcrypt.compare(password, hashedPassword)
        if(!match){
            res.status(404).json({"message": "Incorrect Password"})
        }
        const payload ={
            "_id":getUser?._id,
            "role": getUser?.role
        }
        const JWT_SECRET = process.env.JWT_SECRET as string

        const token = jwt.sign(payload, JWT_SECRET,{
            expiresIn: '1d'
        } )

        res.status(200).json({"token":token})
    } catch (error) {
        res.status(500).json({"message": "Error Registering User"})
    }
}

export default loginController