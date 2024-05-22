import { NextResponse } from "next/server"
import Brand from "@/app/models/brandModel";
const { connectDB } = require("@/dbConfig/dbConfig");




connectDB();


export async function POST(request) {
    const reqBody = await request.json();

    try {
        const saveBrand = await Brand.create(reqBody);

        return NextResponse.json({
            message: "Created a brand successfully",
            success: true,
            brand: saveBrand
        })
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}