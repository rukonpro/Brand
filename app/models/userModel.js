import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a user name"]
    },
    email:{
        type:String,
            required:[true,"Please provide a email "],
            unique:true
        },
    password:{
        type:String,
            required:[true,"Please provide a 6 minimum digit a password"]
        },
    profilePhoto:String,
    coverPhoto:String,
    isVerified:{
        type:Boolean,
            default:false
        },
    role:{
        type: String,
        enum:["admin","user","supplier"],
        default:"user"
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:String,
    verifyToken:String,
    verifyTokenExpiry:String
},{timestamps:true});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;