import React from 'react';
import {getOrderMany} from "@/app/utils/order/fetch_order_api";

import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
const MyOrders =async () => {
    const session = await getServerSession(authOptions)
    const {user}=session;

    const params = {
        userId:user?.id
    }

    const getOrders= await getOrderMany(params);
    const orders=getOrders?.data?.orders;


    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">My Orders</h1>
                <div className="space-x-2">
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg dark:bg-slate-800 dark:text-slate-50 ">All</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg dark:bg-slate-800 dark:text-slate-50 ">Unfulfilled</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg dark:bg-slate-800 dark:text-slate-50 ">Unpaid</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg dark:bg-slate-800 dark:text-slate-50 ">Open</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg dark:bg-slate-800 dark:text-slate-50 ">Closed</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add</button>
                </div>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-lg dark:bg-slate-800">
                <table className="min-w-full table-auto">
                    <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Order ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Total Items</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Total Price</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Discount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Tax</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Sub Total</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Payment</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold ">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order?.id} className="border-b">
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{order?.id}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">
                                <p>{new Date(order?.createdAt).toDateString()}</p>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{order?.user?.firstName}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">{order.items?.length} items</td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">${order?.totalPrice.toFixed(2)}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">${order?.totalTax.toFixed(2)}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">${(order?.totalPrice - order?.totalPriceWithDiscount).toFixed(2)}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">${order?.totalPriceWithDiscount.toFixed(2)}</td>
                            <td className="px-6 py-4">
                  <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order?.paymentStatus === "PENDING" && "bg-yellow-100 text-yellow-800"}
                      ${order?.paymentStatus === "COMPLETED" && "bg-green-100 text-green-800"}
                      ${order?.paymentStatus === "FAILED" && "bg-red-100 text-red-800"}    
                              
                              
                              
                              `}
                  >
                    {order.paymentStatus}
                  </span>
                            </td>
                            <td className="px-6 py-4">
                  <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order?.status === "PENDING" && "bg-yellow-100 text-yellow-800"}
                      ${order?.status === "SHIPPED" && "bg-blue-100 text-blue-800"}
                      ${order?.status === "DELIVERED" && "bg-green-100 text-green-800"}
                      ${order?.status === "CANCELED" && "bg-red-100 text-red-800"}    
                      
                      `}
                  >
                    {order?.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 space-x-2">
                                <button className="text-blue-600 hover:text-blue-900">
                    <span role="img" aria-label="edit">
                      ✏️
                    </span>
                                </button>
                                <button className="text-red-600 hover:text-red-900">
                    <span role="img" aria-label="delete">
                      🗑️
                    </span>
                                </button>

                                <Link href={`/orderDetails/${order?.id}`}>
                                    <button className="text-blue-600 hover:text-blue-900">
                    <span role="img" aria-label="delete">
                      Details
                    </span>
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default MyOrders;