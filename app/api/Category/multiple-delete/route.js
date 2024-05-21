import { NextResponse } from "next/server";
import Category from "@/app/models/categoryModel";




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
        const category = await Category.deleteMany({ _id: { $in: recBody } });


        if (category.deletedCount == 0) {
            return NextResponse.json(

                {
                    error: 'Plseas selected your items',
                    success: false,
                },
                { status: 400 })
        }

        return NextResponse.json({
            message: "Slected category has been successfully deleted",
            success: true,
            categorys: category
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}