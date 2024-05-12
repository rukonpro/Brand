import { NextResponse } from "next/server";
import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import {verifySession} from "@/app/lib/dal";

connectDB();

export async function GET(){
    const session = await verifySession();
    if (!session) return null

    try {
        const user = await User.findOne({_id: session.userId})
        return NextResponse.json({
            massage: "User found",
            data: user
        },{status: 200})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}