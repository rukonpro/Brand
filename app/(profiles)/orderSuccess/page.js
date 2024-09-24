import Link from 'next/link';
import React from "react";
import {getSingleOrder} from "@/app/utils/order/fetch_order_api";

export default async function OrderSuccess({searchParams}) {

    const {orderId,userId}=searchParams;

const params = {
    orderId,
    userId
}
    const getOrder= await getSingleOrder(params);

    const order=getOrder?.data;

    return (
        <div className=" ">
            <div className="max-w-3xl w-full space-y-8 bg-white md:p-10  rounded-lg dark:bg-slate-800  ">
                {/* Success Icon and Message */}
                <div className="flex flex-col items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2l4-4M20 12c0 4.418-3.582 8-8 8s-8-3.582-8-8s3.582-8 8-8s8 3.582 8 8z"
                        />
                    </svg>
                    <h1 className="text-3xl font-bold text-gray-900 mt-4 dark:text-slate-50">
                        Thank you! Your order was successful.
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
                        {"We've received your order and will begin processing it soon."}
                    </p>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-100 p-6 rounded-lg dark:bg-slate-700">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-slate-50">Order Summary</h2>
                    <p className="text-sm text-gray-600 mt-2 dark:text-slate-300">
                        <strong>Order Number:</strong> {order?.id}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 dark:text-slate-300">
                        <strong>Estimated Delivery:</strong> Sep 25, 2024
                    </p>
                    <span className="text-sm text-gray-600 mt-1 dark:text-slate-300">
                        <strong>Shipping Address:</strong> {order?.shippingAddress?.houseNumber}, {order?.shippingAddress?.street}, {order?.shippingAddress?.state}({order?.shippingAddress?.postalCode}),{order?.shippingAddress?.city},{order?.shippingAddress?.country}.
                    </span>
                </div>

                {/* Ordered Items */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-slate-50">Ordered Items</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-slate-700">
                            <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:border-slate-700 dark:text-slate-200">Item</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:border-slate-700 dark:text-slate-200">Qty</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:border-slate-700 dark:text-slate-200">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:border-slate-700 dark:text-slate-200">Dic</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:border-slate-700 dark:text-slate-200">Tax</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:border-slate-700 dark:text-slate-200">DelFree</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700 dark:border-slate-700 dark:text-slate-200">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                order?.items?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">{item?.product?.name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">{item?.quantity}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">${item?.price}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">${item?.totalPriceWithDiscount - item?.totalPrice} ({item?.discountPercentage}%)</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">${item?.totalTax}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">${item?.deliveryFee}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">${item?.totalPrice}</td>
                                    </tr>
                                ))
                            }

                            </tbody>
                        </table>
                    </div>
                </section>
                {/* Payment Information */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-slate-50">Payment Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-slate-300">
                                <strong>Payment Method:</strong> Credit Card (**** **** **** 1234)
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600 dark:text-slate-300">
                                <strong>Subtotal:</strong> ${order?.totalPrice}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-slate-300">
                                <strong>Delivery Fee:</strong> ${order?.totalDeliveryFee}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-slate-300">
                                <strong>Tax:</strong> ${order?.totalTax}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-slate-300">
                                <strong>Total:</strong> ${order?.totalPriceWithDiscount}
                            </p>
                        </div>
                    </div>
                </section>
                {/* Actions */}
                <div className="mt-8">
                    <Link href="/myOrders"
                          className="block w-full text-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">

                        Track Your Order

                    </Link>
                    <Link href="/"
                          className="block w-full text-center mt-4 py-3 px-4 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-slate-50 hover:dark:bg-slate-700">

                        Continue Shopping

                    </Link>
                </div>
            </div>
        </div>
    );
}
