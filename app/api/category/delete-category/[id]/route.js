import { NextResponse } from "next/server";
import Category from "@/app/models/categoryModel";




export const DELETE = async (request, context) => {

    try {
        const { id } = context.params;
        const category = await Category.findByIdAndDelete({ _id: id });

        return NextResponse.json({
            message: "A category has been successfully deleted",
            success: true,
            category: category
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}