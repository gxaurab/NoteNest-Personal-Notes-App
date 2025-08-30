import jwt from 'jsonwebtoken'
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import User from '../../models/userModel'

const resetController = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        const { token } = req.params; 

        if (!password || !token) {
            return res.status(400).json({ message: "Token or Password not found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export default resetController;
