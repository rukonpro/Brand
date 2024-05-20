import { NextResponse } from "next/server";
import Products from "@/app/models/productsModel";
import { connectDB } from "@/dbConfig/dbConfig";


connectDB();

export const GET = async () => {
    try {
        const products = await Products.find();

        return NextResponse.json({
            message: "Get all products successfully",
            success: true,
            products: products
        })
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        );
    }
}