import { NextResponse } from "next/server";
import Products from "@/app/models/productsModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { parseSearchParams } from "@/helpers/parseSearchParams";


connectDB();

export async function GET(request) {

    try {

        // Extract search parameters from the request URL
        const { searchParams } = new URL(request.url);

        const category = searchParams.get("category")
        // console.log(category)

        /* 
                // Convert searchParams to a regular object
                const queres = parseSearchParams(searchParams);
        
                let filters = { ...queres };
        
                // Exclude certain fields from the filters
                const excludeFields = ['sort', 'page', 'limit'];
                excludeFields.forEach(field => delete filters[field]);
        
                // Handle range filters (gt, lt, gte, lte)
                let filtersString = JSON.stringify(filters);
                filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
                filters = await JSON.parse(filtersString);
        
                const queries = {};
        
                // Handle sorting
                if (queres.sort) {
                    const sortBy = queres.sort.split(',').join(' ');
                    queries.sortBy = sortBy;
                }
        
                // Handle field selection
                if (queres.fields) {
                    const fields = queres.fields.split(',').join(' ');
                    queries.fields = fields;
                }
        
                // Handle pagination
                if (queres.page) {
                    const { page = 1, limit = 10 } = queres;
                    const skip = (page - 1) * parseInt(limit, 10);
                    queries.skip = skip;
                    queries.limit = parseInt(limit, 10);
                } */

        // Fetch products with filters, sorting, field selection, and pagination
        const products = await Products.find({ category: category })
            // .skip(queries.skip)
            // .limit(queries.limit)
            // .select(queries.fields)
            // .sort(queries.sortBy)
            .populate(["brand", "category"]);

        // Count total products
        const total = await Products.countDocuments({ category: category });

        // Respond with products data
        return NextResponse.json({
            message: "Get all products successfully",
            success: true,
            totalCount: total,
            products: products,
        });
    } catch (error) {
        // Handle errors
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        );
    }
}