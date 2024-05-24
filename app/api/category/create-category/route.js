import { NextResponse } from "next/server"
import Category from "@/app/models/categoryModel";
const { connectDB } = require("@/dbConfig/dbConfig");




connectDB();


export async function POST(request) {
    const reqBody = await request.json();

    try {
        // const newCategory = await new Category(reqBody);
        const saveCategory = await Category.create(reqBody);

        return NextResponse.json({
            message: "Created a category successfully",
            success: true,
            category: saveCategory
        })
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}