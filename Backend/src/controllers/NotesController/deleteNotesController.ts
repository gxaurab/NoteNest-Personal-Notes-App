import { Response } from "express"
import Note from "../../models/noteModel"
import { AuthRequest } from "../../middlewares/authMiddleware"

const deleteNotesController =async (req:AuthRequest, res: Response) => {

    const userId = req.userDetail?._id
    const {postId} = req.params

    try {
        await Note.findOneAndDelete({_id:postId, userId})
        res.status(200).json({"message":"Deleted Successfully!!"})
    } catch (error) {
        res.status(501).json({"message":"Unable to delete it !!"})
    }
}

export default deleteNotesController