import { NextResponse } from "next/server";
import Category from "@/app/models/categoryModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { parseSearchParams } from "@/helpers/parseSearchParams";


connectDB();

export const GET = async (request,) => {
    try {
        const { page = 1, limit = 10 } = parseSearchParams(request?.url);

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        };


        const categorys = await Category
            .find({})
            .skip((options.page - 1) * options.limit)
            .limit(options.limit);

        const totalCount = await Category.countDocuments({});

        return NextResponse.json({
            message: "Get all category successfully",
            success: true,
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / options.limit),
            currentPage: options.page,
            categorys: categorys
        })
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        );
    }
}