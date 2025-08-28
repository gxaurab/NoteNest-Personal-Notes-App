import { NextFunction, Response } from "express";
import { AuthRequest } from "./authMiddleware";

const adminMiddleware =(req: AuthRequest, res:Response, next: NextFunction)=>{
    
    if(!req.userDetail){
        return res.status(401).json({ message: 'Unauthorized: No user data' });
    }

    if (req.userDetail.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Access denied: Admin role required' });
    }
    next()
}

export default adminMiddleware