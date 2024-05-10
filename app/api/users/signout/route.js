import { NextResponse } from "next/server";
import {deleteSession} from "@/app/lib/session";


export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        deleteSession();
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}