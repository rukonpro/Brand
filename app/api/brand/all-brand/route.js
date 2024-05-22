import { NextResponse } from "next/server";
import Brand from "@/app/models/brandModel";
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


        const brands = await Brand
            .find({})
            .skip((options.page - 1) * options.limit)
            .limit(options.limit);

        const totalCount = await Brand.countDocuments({});

        return NextResponse.json({
            message: "Get all brand successfully",
            success: true,
            totalCount: totalCount,
            totalPages: Math.ceil(totalCount / options.limit),
            currentPage: options.page,
            brands: brands
        })
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        );
    }
}