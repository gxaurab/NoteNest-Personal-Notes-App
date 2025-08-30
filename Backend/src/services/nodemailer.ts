import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.Username,
    pass: process.env.Password,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.Username}`,
      to,
      subject,
      text,
    });
    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Email error:", err);
    throw new Error("Email not sent");
  }
};
