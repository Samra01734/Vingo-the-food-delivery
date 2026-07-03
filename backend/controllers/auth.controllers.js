
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
const signUp =async (req ,res )=>{
    try {
        const {fullName,email ,password,mobile,role}=req.body
        const user=await User.findOne({emaial})
        if(user){
            return res.status(400).json({message:"User Already exist.."})
        }
        if (password.length <6){
        return res.status(400).json({message:"Password must be atleast 6 characters .."})
 
        }
        if (mobile.length<10){
          return res.status(400).json({message:"Mobile number must be at least 10 digits.."})
        }
        const hashPassword=await bcrypt.hash(password,10)
        user=await User.create({
            fullName,
            email,
            role,
            moboile,
            password:hashPassword
        })
    } catch (error) {
        
    }
}