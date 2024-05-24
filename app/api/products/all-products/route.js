import { NextResponse } from "next/server";
import Products from "@/app/models/productsModel";
import { connectDB } from "@/dbConfig/dbConfig";
import { parseSearchParams } from "@/helpers/parseSearchParams";


connectDB();

export async function GET(request) {
    try {
        const queres = parseSearchParams(request?.url);
        let filters = { ...queres };

        //sort , page , limit -> exclude
        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete filters[field]);


        //gt ,lt ,gte .lte
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        filters = JSON.parse(filtersString);




        const queries = {}

        if (queres.sort) {
            // price,qunatity   -> 'price quantity'
            const sortBy = queres.sort.split(',').join(' ')
            queries.sortBy = sortBy
        }

        if (queres.fields) {
            const fields = queres.fields.split(',').join(' ')
            queries.fields = fields

        }


        if (queres.page) {

            const { page = 1, limit = 10 } = queres;      // "3" "10"

            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);

        }

        const products = await Products.find(filters)
            .skip(queries.skip)
            .limit(queries.limit)
            .select(queries.fields)
            .sort(queries.sortBy)
            .populate(["brand", "category"]);


        const total = await Products.countDocuments({});



        return NextResponse.json({
            message: "Get all products successfully",
            sucess: true,
            totalCount: total,
            products: products
        })
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 404 }
        );
    }
}