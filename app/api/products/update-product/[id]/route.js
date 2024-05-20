import { NextRequest, NextResponse } from "next/server";
import Products from "@/app/models/productsModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { parseSearchParams } from "@/helpers/parseSearchParams";


connectDB();


export const PATCH = async (request, context,) => {
    const queres = parseSearchParams(request.url);
    const reqBody = await request.json();
    const { id } = context.params;

    try {
        const product = await Products.findByIdAndUpdate(
            { _id: id },
            reqBody,
            {
                runValidators: true,
                new: true
            }
        );

        return NextResponse.json({
            message: "Update products is successfully",
            success: true,
            product: product
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }

}