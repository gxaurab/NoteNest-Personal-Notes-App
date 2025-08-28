import { Request, Response } from "express";
import Note from "../../models/noteModel";

const adminController =async (req: Request, res: Response)=>{
    try {
        const result = await Note.find({})
        res.json(result)
    } catch (error) {
        res.status(500).json({"message": "Couldn't get notes"})
    }
}


export default adminController