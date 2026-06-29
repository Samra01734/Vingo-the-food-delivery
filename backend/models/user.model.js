import mongooe from "mongoose"
const userSchema =new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:true,
        require:true,
        unique:true
    },
    password:{
        type:String,

    },
    mobile:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["user","owner","deliveryBoy"],
        required:true
    }
},{timeStamp:true})

 const User=mongoose.model("User",userSchema)
 export default User