"use client"
import React, { Suspense } from 'react';
import Link from "next/link";
import Image from "next/image";
import NotFoundImage from "@/public/images/not-found.png";
import UpdateProductOpenModalButton from "@/app/components/AdminDashboard/Products/UpdateProductOpenModalButton";
import useSWR from "swr";
import { fetcher } from "@/app/utils/fetcher/fetcher";
import Loader from '@/app/Loader';
import AddProductButton from './AddProductButton';

const ProductsTable = ({ brands, categories }) => {

    const {
        data: products,
        error: errorProducts,
        isLoading: isLoadingProducts,
        mutate
    } = useSWR('/api/product/findMany', fetcher);


    return isLoadingProducts ? (<Loader title="Products Loading..." />) : (
        <div className='p-3'>
            <div className='flex justify-between items-center pb-1'>
                <h1 className='text-lg '>Products</h1>
                <AddProductButton
                    mutate={mutate}
                    categories={categories}
                    brands={brands} />
            </div>
            <div className="overflow-auto">
                {products?.length > 0 ? (

                    <table className=" table-auto divide-y divide-gray-200  overflow-x-auto ">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">ID</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Photos</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Name</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Description</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Price</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Warranty</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Protection</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Sizes</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Rating</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Tags</th>
                                <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Availability</th>
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
                                        <Image src={product?.images?.[0]} alt={product?.name} height={80} width={80} className="h-20 w-20 object-contain" />
                                    </td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-left">{product?.name?.slice(0, 20)}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-left">{product?.description?.slice(0, 50)}...</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">${product?.basePrice?.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.warranty || "N/A"}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.protection || "N/A"}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.sizes?.join(", ") || "N/A"}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.rating || "N/A"}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.tags?.map(tag => <span key={tag}>#{tag} </span>)}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.status}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.discountPercentage || "0%"}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.taxPercentage || "N/A"}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.deliveryFee || "N/A"}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.brand?.name || "N/A"}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.category?.name || "N/A"}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{
                                        product?.dimension ?
                                            `${product?.dimension?.height && product?.dimension?.length + "X"}
                                        ${product?.dimension?.width && product?.dimension?.width + "X"}
                                        ${product?.dimension?.length && product?.dimension?.length}` : "N/A"}</td>
                                    <td className="px-4 py-2 text-xs sm:text-sm text-gray-700 text-center">{product?.category?.offers?.[0]?.isActive ? "Active" : "Inactive" || "N/A"}</td>
                                    <td className="px-4 py-2 space-x-2 text-center">
                                        <Suspense fallback={null}>
                                            <UpdateProductOpenModalButton
                                                productId={product?.id}
                                                product={product}
                                                brands={brands}
                                                mutate={mutate}
                                                categories={categories}

                                            />
                                        </Suspense>
                                        <button className="text-red-600 hover:text-red-900">
                                            <span role="img" aria-label="delete">🗑️</span>
                                        </button>
                                        <Link href={`/details/${product?.id}`}>
                                            <button className="text-blue-600 hover:text-blue-900">
                                                <span role="img" aria-label="details">Details</span>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                ) : (
                    <div>
                        <p>You have no products, please <AddProductButton /></p>

                        {errorProducts && <div className="text-red-500">
                            {errorProducts?.message}
                        </div>}
                        <div className="flex justify-center">
                            <Image src={NotFoundImage} alt="Not found" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsTable;
