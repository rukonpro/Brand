import { connectDB } from "@/dbConfig/dbConfig";
const { NextResponse } = require("next/server");

connectDB();

export async function GET(){

    console.log("hiiiiiiiiiiiiiiiiiiiiiii")
    try {
     
        return NextResponse.json({
            massage: "User found",
            data: "user"
        },{status: 200})
    } catch (error) {
        return NextResponse.json({error: "rukon"}, {status: 400});
    }
}