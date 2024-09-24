import React from 'react';
import Link from "next/link";

export default function Invoice({order}) {

    return (
        <div className=" ">
            <div className="max-w-4xl mx-auto min-h-screen bg-gray-100 md:p-6 p-3  rounded-lg dark:bg-slate-800 dark:text-slate-50">

                {/* Print Button */}
                <div className="text-right mb-2">
                    <Link href={`/invoice/${order?.id}`}>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Invoice
                        </button>
                    </Link>
                </div>

                {/* Invoice Content with ID */}
                <div>
                    {/* Invoice Header */}
                    <header className="flex justify-between items-center mb-2">
                        <div>
                            <h2 className="text-lg font-semibold mb-4 dark:text-slate-200">Order Details <span
                                className="text-gray-500 dark:text-slate-200">({order?.items?.length})</span></h2>
                        </div>
                        <div>
                        <p className="text-sm text-gray-600 dark:text-slate-300">Date: {new Date(order?.createdAt).toDateString()}</p>
                        </div>
                    </header>

                    {/* Billing and Shipping Information */}
                    <section className="mb-3">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 dark:text-slate-100">Billing & Shipping Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-md font-medium text-gray-700 dark:text-slate-200">Billed To:</h3>

                                    <p className="text-sm text-gray-600 dark:text-slate-300">{order?.user?.firstName}</p>

                                <span className="text-sm text-gray-600 dark:text-slate-300">
                        <strong>Shipping Address:</strong> <span>{order?.user?.houseNumber}</span>, <span>{order?.user?.street},</span> <span>{order?.user?.state}({order?.user?.postalCode}),</span> <span>{order?.user?.city}</span>,<span>{order?.user?.country}</span>.
                    </span>
                                <p className="text-sm text-gray-600 dark:text-slate-300">Phone: {order?.user?.phoneNumber}</p>
                                <p className="text-sm text-gray-600 dark:text-slate-300">Email: {order?.user?.email}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-medium text-gray-700 dark:text-slate-200">Shipped To:</h3>
                                <p className="text-sm text-gray-600 dark:text-slate-300">{order?.shippingAddress?.firstName}</p>
                                <span className="text-sm text-gray-600 dark:text-slate-300 ">
                        <strong>Shipping Address:</strong> <span>{order?.shippingAddress?.houseNumber},</span> <span>{order?.shippingAddress?.street},</span> <span>{order?.shippingAddress?.state}({order?.shippingAddress?.postalCode}),</span> <span>{order?.shippingAddress?.city},</span><span>{order?.shippingAddress?.country}.</span>
                    </span>
                                <p className="text-sm text-gray-600 dark:text-slate-300">Phone: {order?.shippingAddress?.phoneNumber}</p>
                            </div>
                        </div>
                    </section>

                    {/* Order Summary */}
                    <div className="max-w-6xl mx-auto pt-11 ">
                        {/* Order Details Header */}

                        {/* Products Table */}
                        <div className="overflow-x-auto ">
                            <table className="min-w-full table-auto">
                                <thead className="bg-blue-500 text-white">
                                <tr>
                                    <th className="px-3 py-3 text-left text-sm font-medium">Product Name</th>
                                    <th className="px-3 py-3 text-left text-sm font-medium">Product Code</th>
                                    <th className="px-3 py-3 text-left text-sm font-medium">Quantity</th>
                                    <th className="px-3 py-3 text-left text-sm font-medium">Price</th>
                                    <th className="px-3 py-3 text-left text-sm font-medium">Total Price</th>
                                    <th className="px-3 py-3 text-left text-sm font-medium">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order?.items?.map((product, index) => {

                                    return(
                                        <tr key={index} className="border-b">
                                            <td className="px-3 py-3 flex items-center">
                                                <img src={product?.product?.photos?.[0]} alt={product?.name}
                                                     className="w-10 h-10 rounded mr-4 "/>
                                                <div>
                                                    <Link href={`/details/${product?.product?.id}`} className="hover:!text-blue-500 dark:text-slate-200" >
                                                    <p className="text-sm font-medium dark:text-slate-200">{product?.product?.name}</p>
                                                    </Link>
                                                    <p className="text-xs text-gray-500 dark:text-slate-200">Color: {product?.product?.colors?.[0]}</p>
                                                </div>
                                            </td>
                                            <td className="px-3 py-3 text-sm text-gray-700 dark:text-slate-200">{product?.productId}</td>
                                            <td className="px-3 py-3 text-sm text-gray-700 dark:text-slate-200">x{product?.quantity}</td>
                                            <td className="px-3 py-3 text-sm text-blue-600 font-semibold dark:text-slate-200">{product?.price}</td>
                                            <td className="px-3 py-3 text-sm text-blue-600 font-semibold dark:text-slate-200">{product?.totalPrice}</td>
                                            <td className="px-3 py-3">
                                                <button className="text-gray-500 hover:text-gray-700">
                                                    <span role="img" aria-label="edit">✏️</span>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>

                        {/* Order Summary */}
                        <div className="pt-10 ">
                            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600 dark:text-slate-300">Subtotal</span>
                                <span className="text-sm font-semibold">${order?.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600 dark:text-slate-300">Shipping Fee</span>
                                <span className="text-sm font-semibold">${order?.totalDeliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600 dark:text-slate-300">Tax</span>
                                <span className="text-sm font-semibold"> ${order?.totalTax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600 dark:text-slate-300">Discount</span>
                                <span className="text-sm font-semibold"> ${(order?.totalPriceWithDiscount-order?.totalPrice).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-300 pt-4">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-lg font-semibold">${order?.totalPriceWithDiscount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    {/*<section className="mb-8">*/}
                    {/*    <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>*/}
                    {/*    <div className="grid grid-cols-2 gap-4">*/}
                    {/*        <div>*/}
                    {/*            <p className="text-sm text-gray-600">*/}
                    {/*                <strong>Payment Method:</strong> Credit Card (**** **** **** 1234)*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*        <div className="text-right">*/}
                    {/*            <p className="text-sm text-gray-600">*/}
                    {/*                <strong>Subtotal:</strong> ${order?.totalPrice}*/}
                    {/*            </p>*/}
                    {/*            <p className="text-sm text-gray-600">*/}
                    {/*                <strong>Delivery Fee:</strong> ${order?.totalDeliveryFee}*/}
                    {/*            </p>*/}
                    {/*            <p className="text-sm text-gray-600">*/}
                    {/*                <strong>Tax:</strong> ${order?.totalTax}*/}
                    {/*            </p>*/}
                    {/*            <p className="text-sm text-gray-600">*/}
                    {/*                <strong>Total:</strong> ${order?.totalPriceWithDiscount}*/}
                    {/*            </p>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</section>*/}

                    {/* Footer */}
                    <footer className="text-center">
                        <p className="text-sm text-gray-500 dark:text-slate-200">
                            Thank you for your business! If you have any questions about this invoice, please contact us
                            at <a href="mailto:support@example.com" className="text-blue-500">support@brand.com</a>.
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
