import { Router } from "express";
import signupController from "../controllers/AuthController/signupController";
import loginController from "../controllers/AuthController/loginController";
import { refreshController } from "../controllers/AuthController/refreshController";
import { logoutController } from "../controllers/AuthController/logoutController";


const router = Router()

router.post('/signup',signupController)
router.post('/login', loginController)
router.post('/refresh', refreshController)
router.post('/logout', logoutController)

export default router