import Products from "@/app/models/productsModel";


const getProducts = async (searchParams) => {

    try {

        const queres = searchParams;

        let filters = { ...searchParams };

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
        }

        // Fetch products with filters, sorting, field selection, and pagination
        const products = await Products.find(filters)
            .skip(queries.skip)
            .limit(queries.limit)
            .select(queries.fields)
            .sort(queries.sortBy)
            .populate(["brand", "category"]);

        // Count total products
        const total = await Products.countDocuments(filters);

        // Respond with products data
        return {
            message: "Get all products successfully",
            success: true,
            totalCount: total,
            products: products,
        };

    } catch (error) {
        return {
            error: error.error,
            success: false,
        };
    }
}
export default getProducts;