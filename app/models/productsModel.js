import mongoose from "mongoose";
import Brand from "@/app/models/brandModel";
import Category from "./categoryModel";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Title most be required"]
    },
    description: {
        type: String,
        required: [true, "Description most be required"]
    },
    images: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value && value.length > 0;
            },
            message: 'At least one photo is required'
        }
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"

    },
    material: String,
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,

    },
    quantity: {
        type: Number,
        default: 0
    },
    variants: [{
        name: String,
        price: Number,
        colors: [String],
        sizes: [String],
        sku: String, // Variant SKU
        availability: String
    }],
    colors: [String],
    sizes: [String],
    rating: {
        type: Number,
        default: 0
    },
    weight: Number,
    reviews: [{
        user: String,
        body: String,
        rating: Number,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    tags: [String],
    availability: {
        type: String,
        enum: ["In Stock", "Out of Stock"]
    },
    promotionalInfo: String,
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    shippingInfo: {
        cost: Number,
        deliveryTime: String
    },
    salesData: {
        totalSales: {
            type: Number,
            default: 0
        },
        revenue: {
            type: Number,
            default: 0
        }
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    sellerInfo: {
        sellerName: String,
        sellerContact: String
    },
    warranty: {
        duration: String,
        coverage: String,
        terms: String
    },
    discounts: [{
        percentage: Number,
        code: String,
        description: String
    }],
    inventoryTracking: {
        minStockLevel: Number,
        reorderQuantity: Number
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Discontinued'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


const Products = mongoose.models.Products || mongoose.model('Products', productsSchema);

export default Products;