import { Router } from "express";
import signupController from "../controllers/AuthController/signupController";
import loginController from "../controllers/AuthController/loginController";
import { refreshController } from "../controllers/AuthController/refreshController";
import { logoutController } from "../controllers/AuthController/logoutController";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";
import adminController from "../controllers/Admin/adminController";
import forgotPassController from "../controllers/AuthController/forgotPassController";
import resetController from "../controllers/AuthController/resetController";


const router = Router()

router.post('/signup',signupController)
router.post('/login', loginController)
router.post('/refresh', refreshController)
router.post('/logout', logoutController)

router.post('/forgot-password', forgotPassController)

router.post('/reset-password/:token', resetController)


router.get('/admin',authMiddleware, adminMiddleware, adminController)

export default router