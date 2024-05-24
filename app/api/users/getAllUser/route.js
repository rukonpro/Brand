import { connectDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connectDB();

export async function GET(){
    try {
        return NextResponse.json({
            massage: "User found",
            data: "user"
        },{status: 200})
    } catch (error) {
        return NextResponse.json({error: "rukon"}, {status: 400});
    }
}