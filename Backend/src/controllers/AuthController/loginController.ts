
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
        const match = await bcrypt.compare(password, hashedPassword)
        if(!match){
            res.status(401).json({"message": "Incorrect Password"})
        }
        const payload ={
            "_id":getUser?._id,
            "username": username,
            "role": getUser?.role
        }
        const ACCESS_SECRET = process.env.ACCESS_SECRET as string
        const REFRESH_SECRET = process.env.REFRESH_SECRET as string

        const accessToken = jwt.sign(payload, ACCESS_SECRET,{expiresIn: '1h'} )
        const refreshToken = jwt.sign(payload, REFRESH_SECRET, {expiresIn: '2d'})

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            maxAge: 2* 24* 60* 60* 1000
        })

        res.json({accessToken})
    } catch (error) {
        res.status(500).json({"message": "Error logging in User"})
    }
}

export default loginController