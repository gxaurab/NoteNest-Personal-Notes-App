import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../../models/userModel";
import { sendEmail } from "../../services/nodemailer";

dotenv.config();

const forgotPassController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log("Email Received that is",email)
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // check user
    const checkUser = await User.findOne({ email }); 
    if (!checkUser) {
      return res.status(404).json({ message: `User with email ${email} not found` });
    }

    // create token
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const token = jwt.sign({ email: checkUser.email }, JWT_SECRET, { expiresIn: "1h" });

    // generate reset URL
    const resetUrl = `${process.env.FRONTEND_BASE_URL}/reset-password/${token}`;

    // send email
    await sendEmail(
      email,
      "Reset Your Password - Tangible App",
      `Hello,\n\nPlease click the following link to reset your password:\n${resetUrl}\n\nThis link expires in 1 hour.`
    );

    return res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to send mail" });
  }
};

export default forgotPassController;
