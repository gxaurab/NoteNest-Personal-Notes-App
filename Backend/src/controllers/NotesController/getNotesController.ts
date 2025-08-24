import { Response } from "express"
import Note from "../../models/noteModel"
import { AuthRequest } from "../../middlewares/authMiddleware"

const getNotesController = async(req:AuthRequest, res: Response) => {
    const userId = req.userDetail?._id

    try {
        const note = await Note.find({
            userId
        })  
        res.status(200).json({note})  
    } catch (error) {
        res.status(404).json({"message":"no any notes found"})
    }
}

export default getNotesController