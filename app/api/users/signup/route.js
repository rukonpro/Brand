import {connectDB} from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import {NextResponse} from "next/server"
import User from "@/app/models/userModel";

connectDB()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {name, email, password} = reqBody;
        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        //send verification email
     /*   await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})*/

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}