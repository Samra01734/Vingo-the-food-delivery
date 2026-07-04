
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"
//sign up 
export const signUp =async (req ,res )=>{
    try {
        const {fullName,email ,password,mobile,role}=req.body
        const user=await User.findOne({user})
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
        const token =await genToken(user._id)
        res.cookies("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })
        return res.status(201).json(user)
    } catch (error) {
                return res.status(500).json(`sign up error ${error}`)

    }
}
//signIn
export const signIn =async (req ,res )=>{
    try {
        const {email ,password}=req.body
        const user=await User.findOne({user})
        if(!user){
            return res.status(400).json({message:"User does not  exist.."})
        }
       
       const isMatch=await bcrypt.compare(password,user.password)
       if(!isMatch){
      return res.status(400).json({message:"Incorrect Password"})

       }

        const token =await genToken(user._id)
        res.cookies("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })
        return res.status(200).json(user)
    } catch (error) {
                return res.status(500).json(`sign In error ${error}`)

    }
}

//signout
export const signOut=async (req,res)=>{
    try {
        res.clearCookie("token")
return res.status(200).json({message:"log out sucessfully"})
    } catch (error) {
       return res.status(500) .json(`sign out error ${error}`)
    }
}