import { NextResponse } from "next/server";
import Category from "@/app/models/categoryModel";
import { connectDB } from "@/dbConfig/dbConfig";


connectDB();


export const PATCH = async (request, context) => {

    const reqBody = await request.json();
    const { id } = context.params;

    try {
        const category = await Category.findByIdAndUpdate(
            { _id: id },
            reqBody,
            {
                runValidators: true,
                new: true
            }
        );

        return NextResponse.json({
            message: "Update category is successfully",
            success: true,
            category: category
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }

}