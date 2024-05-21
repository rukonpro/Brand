import { NextResponse } from "next/server";
import Products from "@/app/models/productsModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { parseSearchParams } from "@/helpers/parseSearchParams";


connectDB();

export const GET = async (request) => {
    try {
        const queres = parseSearchParams(request?.url);

        const products = await Products.find();
        const total = await Products.countDocuments();
        return NextResponse.json({
            message: "Get all products successfully",
            success: true,
            total: total,
            products: products
        })
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        );
    }
}