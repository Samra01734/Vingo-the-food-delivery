import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../models/user.model";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export default transporter;

export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Reset Your Password",
    html: `
      <p>Your OTP for password reset is <b>${otp}</b>.</p>
      <p>This OTP expires in <b>5 minutes</b>.</p>
    `,
  });
};

