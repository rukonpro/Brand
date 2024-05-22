import { NextResponse } from "next/server";
import Brand from "@/app/models/brandModel";
import { connectDB } from "@/dbConfig/dbConfig";


connectDB();


export const PATCH = async (request, context) => {

    const reqBody = await request.json();
    const { id } = context.params;

    try {
        const brand = await Brand.findByIdAndUpdate(
            { _id: id },
            reqBody,
            {
                runValidators: true,
                new: true
            }
        );

        return NextResponse.json({
            message: "Update brand is successfully",
            success: true,
            brand: brand
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }

}