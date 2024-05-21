import { NextResponse } from "next/server";
import Products from "@/app/models/productsModel";




export const DELETE = async (request) => {

    try {
        const recBody = await request.json();

        if (!recBody || !Array.isArray(recBody)) {
            return NextResponse.json(

                {
                    error: 'Invalid request, ids must be an array.',
                    success: false,
                },
                { status: 400 })
        }
        const product = await Products.deleteMany({ _id: { $in: recBody } });


        if (product.deletedCount == 0) {
            return NextResponse.json(

                {
                    error: 'Plseas selected your items',
                    success: false,
                },
                { status: 400 })
        }

        return NextResponse.json({
            message: "Slected Products has been successfully deleted",
            success: true,
            product: product
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}