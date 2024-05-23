import { NextResponse } from "next/server";
import Products from "@/app/models/productsModel";


export const GET = async (request, context) => {

    try {
        const { id } = context.params;
        const product = await Products.findOne({ _id: id })
            .populate(["brand", "category"]);

        return NextResponse.json({
            message: "Get a product has been successfully",
            success: true,
            product: product
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}
