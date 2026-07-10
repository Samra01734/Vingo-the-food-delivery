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

export const sendOtp=async (req,res)=>{
try {
  const {email}=req.body
  const user=await User.findObe({email})
  if(!user){
    return res.status(400).json({message:"User does not exist."})
  }
  const otp=Math.floor(100+Math.eandom()*9000).toString()
  user.resetOtp=otp 
  user.otpExpires=Date.now()+5*60*60*1000
  user.isOtpVerified=false

  await user.save()
  await sendOtpMail(user.Date)

} catch (error) {
  
}
}