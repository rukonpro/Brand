import { NextResponse } from "next/server";
import Products from "@/app/models/productsModel";




export const DELETE = async (request, context) => {

    try {
        const { id } = context.params;
        const product = await Products.findByIdAndDelete({ _id: id });

        return NextResponse.json({
            message: "A product has been successfully deleted",
            success: true,
            product: product
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}