import { Router } from "express";
import getNotesController from "../controllers/NotesController/getNotesController";
import createNotesController from "../controllers/NotesController/createNotesController";
import deleteNotesController from "../controllers/NotesController/deleteNotesController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router()

router.get('/notes',authMiddleware, getNotesController)
router.post('/notes',authMiddleware ,createNotesController)
router.delete('/notes/:postId',authMiddleware, deleteNotesController)

export default router

