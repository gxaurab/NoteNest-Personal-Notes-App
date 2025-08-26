import dotenv from 'dotenv'
dotenv.config()
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/userModel";

interface JwtPayload {
  _id: string;
  role: string;
}

export const refreshController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const payload = { _id: user._id, role: user.role };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};
