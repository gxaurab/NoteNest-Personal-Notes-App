import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface JwtUserPayload {
  _id: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request{
    userDetail?: {
        _id: string;
        role: string;
        iat: number;
        exp: number;
    }
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    
    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) {
        return res.status(401).json({ message: "No token provided" })
    }
    
    try {
        const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET as string) as JwtUserPayload;
        req.userDetail = payload;
        console.log(payload)
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

export default authMiddleware   