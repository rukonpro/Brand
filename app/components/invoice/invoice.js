import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Invoice({ order }) {



    return (
        <div>
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
                                className="text-gray-500 dark:text-slate-200">({order?.orderSummery?.[0]?.totalItems})</span></h2>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-slate-300">Date: {new Date(order?.orderDate).toDateString()}</p>
                        </div>
                    </header>

                    {/* Billing and Shipping Information */}
                    <section className="mb-3">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 dark:text-slate-100">Billing & Shipping Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-md font-medium text-gray-700 dark:text-slate-200">Billed To:</h3>

                                <p className="text-sm text-gray-600 dark:text-slate-300">{order?.billingAddress?.firstName} {order?.billingAddress?.lastName}</p>

                                <span className="text-sm text-gray-600 dark:text-slate-300">
                                    <strong>Billing Address:</strong> <span>{order?.billingAddress?.streetAddress},</span> <span>{order?.billingAddress?.landmarkArea}({order?.billingAddress?.postalCode}),{order?.billingAddress?.city},</span> <span>{order?.billingAddress?.region}</span>,<span>{order?.billingAddress?.country}</span>.
                                </span>
                                <p className="text-sm text-gray-600 dark:text-slate-300"><strong>Phone:</strong> {order?.billingAddress?.phoneNumber}</p>
                                <p className="text-sm text-gray-600 dark:text-slate-300 capitalize"><strong>Delivery Label:</strong> {order?.billingAddress?.deliveryLabel}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-medium text-gray-700 dark:text-slate-200">Shipped To:</h3>
                                <p className="text-sm text-gray-600 dark:text-slate-300">{order?.shippingAddress?.firstName} {order?.shippingAddress?.lastName}</p>
                                <span className="text-sm text-gray-600 dark:text-slate-300 ">
                                    <strong>Shipping Address:</strong>  <span>{order?.shippingAddress?.streetAddress},</span> <span>{order?.shippingAddress?.landmarkArea}({order?.shippingAddress?.postalCode}),{order?.shippingAddress?.city},</span> <span>{order?.shippingAddress?.region}</span>,<span>{order?.shippingAddress?.country}</span>
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
                                        <th className="px-3 py-3 text-left text-sm font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.orderItems?.map((product, index) => {

                                        return (
                                            <tr key={index} className="border-b">
                                                <td className="px-3 py-3 flex items-center">
                                                    <Image src={product?.variant?.images?.[0]} width={40} height={40} alt={product?.productName}
                                                        className="w-10 h-10 rounded mr-4 " />
                                                    <div>
                                                        <Link href={`/details/${product?.product?.id}`} className="hover:!text-blue-500 dark:text-slate-200" >
                                                            <p className="text-sm font-medium dark:text-slate-200">{product?.productName}</p>
                                                        </Link>
                                                        <ul>

                                                            {
                                                                product?.variant?.attributes?.map((attribute, index) => {
                                                                    return (
                                                                        <li key={index} className="text-xs text-gray-500 dark:text-slate-200">
                                                                            {attribute?.name}: {attribute?.value}
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-3 text-sm text-gray-700 dark:text-slate-200">{product?.productId}</td>
                                                <td className="px-3 py-3 text-sm text-gray-700 dark:text-slate-200">x{product?.quantity}</td>
                                                <td className="px-3 py-3 text-sm text-blue-600 font-semibold dark:text-slate-200">{product?.price}</td>

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


                    </div>

                    {/* Payment Information */}
                    <section className="mb-8 mt-10">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>
                                <p className="text-sm text-gray-600">
                                    <strong>Payment Method:</strong> {order?.paymentMethod}
                                </p>
                            </div>
                            <div >
                                {/* Order Summary */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600 dark:text-slate-300">Subtotal</span>
                                        <span className="text-sm font-semibold">${order?.orderSummery?.[0]?.subTotalPrice?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600 dark:text-slate-300">Delivery Fee</span>
                                        <span className="text-sm font-semibold">free</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600 dark:text-slate-300">Tax({order?.orderSummery?.[0]?.taxPercent})%</span>
                                        <span className="text-sm font-semibold"> ${order?.orderSummery?.[0]?.totalTax?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-600 dark:text-slate-300">Discount</span>
                                        <span className="text-sm font-semibold"> ${order?.orderSummery?.[0]?.totalDiscount?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-gray-300 pt-4">
                                        <span className="text-lg font-semibold">Total</span>
                                        <span className="text-lg font-semibold">${order?.orderSummery?.[0]?.totalPrice?.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

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
