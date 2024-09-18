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
        <div>
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border  rounded-lg shadow-md">
                    <thead>
                    <tr className="border-b border-gray-300 bg-blue-50">
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Order ID</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Status</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Payment Status</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Order Date</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Tax</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Discount</th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium">Delivery Fee</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders?.map(order => (
                        <Link
                            key={order?.id}
                            href={`/orderDetails/${order?.id}`}
                            passHref
                        >
                            <tr

                                className="border-b border-gray-300 hover:bg-gray-100 transition-colors duration-300 ease-in-out cursor-pointer"
                            >
                                <td className="px-6 py-4 text-gray-800">{order?.id}</td>
                                <td className={`px-6 py-4 ${order?.status === 'PENDING' ? 'text-yellow-600' : 'text-green-600'}`}>
                                    {order?.status}
                                </td>
                                <td className={`px-6 py-4 ${order.paymentStatus === 'PENDING' ? 'text-yellow-600' : 'text-green-600'}`}>
                                    {order?.paymentStatus}
                                </td>
                                <td className="px-6 py-4">{new Date(order?.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">${order?.totalTax?.toFixed(2)}</td>
                                <td className="px-6 py-4">${(order?.totalPriceWithDiscount - order?.totalPrice).toFixed(2)}</td>
                                <td className="px-6 py-4">${order?.totalDeliveryFee.toFixed(2)}</td>
                            </tr>
                        </Link>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;