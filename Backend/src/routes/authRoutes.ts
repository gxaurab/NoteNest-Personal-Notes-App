import { Router } from "express";
import signupController from "../controllers/AuthController/signupController";
import loginController from "../controllers/AuthController/loginController";


const router = Router()

router.post('/signup',signupController)
router.post('/login', loginController)

export default router