import { NextResponse } from "next/server"
import Products from "@/app/models/productsModel";
const { connectDB } = require("@/dbConfig/dbConfig");




connectDB();


export async function POST(request) {
    const reqBody = await request.json();
  
    try {
        const newProduct = await new Products(reqBody);
        const saveProduct = await newProduct.save();

        return NextResponse.json({
            message: "Created a product successfully",
            success: true,
            product: saveProduct
        })
    } catch (error) {
        console.log(error)
    }
}