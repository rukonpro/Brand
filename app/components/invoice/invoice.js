"use client"
import React from 'react';

export default function Invoice({order}) {

    const handlePrint = () => {
        const invoiceContent = document.getElementById('invoiceToPrint').innerHTML;
        const originalContents = document.body.innerHTML;

        // Replace the body content with invoice content
        document.body.innerHTML = `
      <html>
      <head>
        <title>Invoice</title>
        <style>
          /* Add any styles needed for printing here */
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            width: 100%;
            margin: 0 auto;
            padding: 20px;
          }
          /* Add other print styles as needed */
        </style>
      </head>
      <body>
        <div class="container">
          ${invoiceContent}
        </div>
      </body>
      </html>
    `;

        // Trigger the print dialog
        window.print();

        // Restore the original content after printing
        window.onafterprint = () => {
            document.body.innerHTML = originalContents;
            window.location.reload(); // Refresh the page to restore the original state
        };
    };

    return (
        <div className="min-h-screen bg-gray-100 ">
            <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">

                {/* Print Button */}
                <div className="text-right mb-2">
                    <button
                        onClick={handlePrint}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Print Invoice
                    </button>
                </div>

                {/* Invoice Content with ID */}
                <div id="invoiceToPrint">
                    {/* Invoice Header */}
                    <header className="flex justify-between items-center mb-2">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Invoice</h1>
                            <p className="text-sm text-gray-500">Order: {order?.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Date: September 16, 2024</p>
                            <p className="text-sm text-gray-600">Invoice #: INV-00012345</p>
                        </div>
                    </header>

                    {/* Company Information */}
                    <section className="mb-3">
                        <h2 className="text-lg font-semibold text-gray-800 ">Company Information</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="text-md font-bold text-gray-700">Brand</h3>
                                <p className="text-sm text-gray-600">Sunamganj,Sylhet, Bangladesh.</p>
                                <p className="text-sm text-gray-600">Phone: +880765459224</p>
                                <p className="text-sm text-gray-600">Email: info@brand.com</p>
                                <p className="text-sm text-gray-600">Website: www.brand.com</p>
                            </div>
                        </div>
                    </section>

                    {/* Billing and Shipping Information */}
                    <section className="mb-3">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Billing & Shipping Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-md font-medium text-gray-700">Billed To:</h3>
                                <p className="text-sm text-gray-600">{order?.user?.firstName}</p>
                                <span className="text-sm text-gray-600">
                        <strong>Shipping Address:</strong> {order?.user?.houseNumber}, {order?.user?.street}, {order?.user?.state}({order?.user?.postalCode}),{order?.user?.city},{order?.user?.country}.
                    </span>
                                <p className="text-sm text-gray-600">Phone: {order?.user?.phoneNumber}</p>
                                <p className="text-sm text-gray-600">Email: {order?.user?.email}</p>
                            </div>
                            <div>
                                <h3 className="text-md font-medium text-gray-700">Shipped To:</h3>
                                <p className="text-sm text-gray-600">{order?.shippingAddress?.firstName}</p>
                                <span className="text-sm text-gray-600 ">
                        <strong>Shipping Address:</strong> {order?.shippingAddress?.houseNumber}, {order?.shippingAddress?.street}, {order?.shippingAddress?.state}({order?.shippingAddress?.postalCode}),{order?.shippingAddress?.city},{order?.shippingAddress?.country}.
                    </span>
                                <p className="text-sm text-gray-600">Phone: {order?.shippingAddress?.phoneNumber}</p>
                            </div>
                        </div>
                    </section>

                    {/* Order Summary */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ordered Items</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Qty</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Dic</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Tax</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">DelFree</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    order?.items?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{item?.product?.name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{item?.quantity}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">${item?.price.toFixed(2)}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">${(item?.totalPriceWithDiscount - item?.totalPrice).toFixed(2)} ({item?.discountPercentage}%)</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">${item?.totalTax.toFixed(2)}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">${item?.deliveryFee.toFixed(2)}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">${item?.totalPrice.toFixed(2)}</td>
                                        </tr>
                                    ))
                                }

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
                                    <strong>Subtotal:</strong> ${order?.totalPrice}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Delivery Fee:</strong> ${order?.totalDeliveryFee}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Tax:</strong> ${order?.totalTax}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Total:</strong> ${order?.totalPriceWithDiscount}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="text-center">
                        <p className="text-sm text-gray-500">
                            Thank you for your business! If you have any questions about this invoice, please contact us
                            at <a href="mailto:support@example.com" className="text-blue-500">support@brand.com</a>.
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
