import { verifySession } from "@/app/lib/dal";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";

const { connectDB } = require("@/dbConfig/dbConfig");


connectDB()

export const PATCH = async (request) => {

    const session = await verifySession();
    if (!session) return null;

    try {
        const reqBody = await request.json();
        if (!reqBody) return null;

        const user = await User.findByIdAndUpdate(
            { _id: session.userId },
            reqBody,
            { runValidators: true }
        )

        return NextResponse.json({
            message: "User update successfully",
            success: true,
            user
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}