import { NextResponse } from "next/server";
import Brand from "@/app/models/brandModel";




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
        const brand = await Brand.deleteMany({ _id: { $in: recBody } });


        if (brand.deletedCount == 0) {
            return NextResponse.json(

                {
                    error: 'Plseas selected your items',
                    success: false,
                },
                { status: 400 })
        }

        return NextResponse.json({
            message: "Slected brand has been successfully deleted",
            success: true,
            brands: brand
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}