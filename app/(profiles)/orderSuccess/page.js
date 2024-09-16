import Link from 'next/link';
import React from "react";

export default function OrderSuccess() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
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
                    <h1 className="text-3xl font-bold text-gray-900 mt-4">
                        Thank you! Your order was successful.
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        We've received your order and will begin processing it soon.
                    </p>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                    <p className="text-sm text-gray-600 mt-2">
                        <strong>Order Number:</strong> #123456789
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        <strong>Estimated Delivery:</strong> Sep 25, 2024
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        <strong>Shipping Address:</strong> 123 Main St, Sunamganj, Bangladesh
                    </p>
                </div>

                {/* Ordered Items */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Ordered Items</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Qty</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Women's Floral
                                    Dress
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">2</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$49.99</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$99.98</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Leather Handbag
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">1</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$89.99</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$89.99</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Men's T-Shirt
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">3</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$19.99</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$59.97</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Sports Watch</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">1</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$129.99</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$129.99</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Sunglasses</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">1</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$79.99</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$79.99</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Backpack</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">1</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$89.99</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$89.99</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Bluetooth
                                    Speaker
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">1</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$49.99</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$49.99</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Notebook</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">5</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$12.99</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$64.95</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Smartphone Case
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">2</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$24.99</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$49.98</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">Portable
                                    Charger
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">1</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$39.99</td>
                                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">$39.99</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                {/* Payment Information */}
                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">
                                <strong>Payment Method:</strong> Credit Card (**** **** **** 1234)
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">
                                <strong>Subtotal:</strong> $774.80
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Shipping:</strong> Free
                            </p>
                            <p className="text-sm text-gray-600">
                                <strong>Total:</strong> $774.80
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
                          className="block w-full text-center mt-4 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">

                        Continue Shopping

                    </Link>
                </div>
            </div>
        </div>
    );
}
