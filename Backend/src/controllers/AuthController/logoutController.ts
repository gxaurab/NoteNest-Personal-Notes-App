import { Request, Response } from "express";

export const logoutController = async (req: Request, res: Response) => {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Logged out" });
};