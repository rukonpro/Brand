import { NextResponse } from "next/server";
import Brand from "@/app/models/brandModel";




export const DELETE = async (request, context) => {

    try {
        const { id } = context.params;
        const brand = await Brand.findByIdAndDelete({ _id: id });

        return NextResponse.json({
            message: "A brand has been successfully deleted",
            success: true,
            brand: brand
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}