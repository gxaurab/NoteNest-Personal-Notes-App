import { Response } from "express"
import Note from "../../models/noteModel"
import { AuthRequest } from "../../middlewares/authMiddleware"

const deleteNotesController =async (req:AuthRequest, res: Response) => {

    const userId = req.userDetail?._id
    const {postId} = req.params
    const userRole = req.userDetail?.role

    const query = userRole === "ADMIN"? {_id: postId}: {_id: postId, userId}

    try {
        await Note.findOneAndDelete(query)

        if(!Note){
            return res.status(404).json({ message: 'Note not found or unauthorized' });
        }

        res.status(200).json({"message":"Deleted Successfully!!"})
    } catch (error) {
        res.status(501).json({"message":"Unable to delete it !!"})
    }
}

export default deleteNotesController