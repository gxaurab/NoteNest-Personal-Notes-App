
//title tag body favourite category

import { Response } from "express"
import Note from "../../models/noteModel"
import { AuthRequest } from "../../middlewares/authMiddleware";


const createNotesController = async (req:AuthRequest, res: Response)=> {

    const {title, tags, body, favourite, category} = req.body 

    const userId = req.userDetail?._id

    try {
        const newNote = await Note.create({
            title, tags, body, favourite, category, userId
        })

        res.status(200).json({"message": "Note Added Successfully"})
    } 
    catch (error:unknown) {
        if (error instanceof Error) {
            console.error('Error creating note:', error.message)
        } else {
            console.error('Unknown error:', error)
        }
        
        res.status(400).json({
            message: "Couldn't create Note"
        })

    }
}

export default createNotesController