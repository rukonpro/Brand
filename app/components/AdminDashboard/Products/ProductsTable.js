"use client"
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import NotFoundImage from "@/public/images/not-found.png";
import UpdateProductOpenModalButton from "@/app/components/AdminDashboard/Products/UpdateProductOpenModalButton";
import useSWR from "swr";
import {fetcher} from "@/app/utils/fetcher/fetcher";

const ProductsTable = ({brands,categories }) => {

    const {
        data:products,
        error:errorProducts,
        isLoading:isLoadingProducts,
        mutate
    } = useSWR('/api/product/findMany', fetcher);

    return (
        <div>
            {products?.length > 0 ? (
                <div >
                    <table className=" table-auto divide-y divide-gray-200  ">
                        <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">ID</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Photos</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Name</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Description</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Price</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Material</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Quantity</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Warranty</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Protection</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Sizes</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Rating</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Tags</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Availability</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Status</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">DiscountPercentage</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">TaxPercentage</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">DeliveryFee</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Brand</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Category</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Dimension</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Offers</th>
                            <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Action</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {products?.map((product, i) => (
                            <tr key={product?.id}>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{i + 1}</td>
                                <td className="px-4 py-2 text-center">
                                    <Image src={product?.photos?.[0]} alt={product?.name} height={80} width={80} className="h-20 w-20 object-contain" />
                                </td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-left">{product?.name?.slice(0, 20)}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-left">{product?.description?.slice(0, 50)}...</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">${product?.price?.toFixed(2)}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.material}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.quantity}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.warranty || "N/A"}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.protection || "N/A"}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.sizes?.join(", ") || "N/A"}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.rating || "N/A"}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.tags?.map(tag => <span key={tag}>#{tag} </span>)}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.availability}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.status}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.discountPercentage || "0%"}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.taxPercentage || "N/A"}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.deliveryFee || "N/A"}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.brand?.name || "N/A"}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.category?.name || "N/A"}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{
                                    product?.dimension ?
                                        `${product?.dimension?.height&&product?.dimension?.length + "X"}
                                        ${product?.dimension?.width&&product?.dimension?.width+"X"}
                                        ${product?.dimension?.length&&product?.dimension?.length}` : "N/A"}</td>
                                <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.category?.offers?.[0]?.isActive ? "Active" : "Inactive" || "N/A"}</td>
                                <td className="px-4 py-2 space-x-2 text-center">
                                    <UpdateProductOpenModalButton
                                        productId={product?.id}
                                        product={product}
                                        brands={brands}
                                        mutate={mutate}
                                        categories={categories}

                                    />
                                    <button className="text-red-600 hover:text-red-900">
                                        <span role="img" aria-label="delete">🗑️</span>
                                    </button>
                                    <Link href={`/orderDetails/${product?.id}`}>
                                        <button className="text-blue-600 hover:text-blue-900">
                                            <span role="img" aria-label="details">Details</span>
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <p>You have no products, please <Link href="/" className="text-blue-500 underline">add products</Link>!</p>
                    <div className="flex justify-center">
                        <Image src={NotFoundImage} alt="Not found" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsTable;
