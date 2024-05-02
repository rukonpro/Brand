import React from 'react';
import fakeData from "@/app/FakeData/FakeData";
import Image from "next/image";

const MyOrders = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-600 pb-5 px-3 md:px-0">My Orders</h1>
                <div className="flex items-center bg-gray-200 px-2 mb-1">
                    <p>Filter</p>
                    <select className="px-3 py-1 rounded">
                        <option>No-selected</option>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Completed</option>
                    </select>
                </div>
            </div>

            <div className="hidden md:block">
                <div className="grid grid-cols-12 px-2 py-3 bg-gray-200 rounded-t-lg">
                    <p className="col-span-1">No:</p>
                    <p className="col-span-2">Date:</p>
                    <p className="col-span-2">Image</p>
                    <p className="col-span-3">Name</p>
                    <p className="col-span-3">Description</p>
                    <p className="col-span-1">Status</p>
                </div>
            </div>
            <ol className="grid col-span-1 gap-0.5">
                {
                    fakeData.products.slice(0, 10).map((product, index) => {
                        return (
                            <li key={index}>
                                <div className=" grid grid-cols-12 items-center gap-2 bg-white p-3 border-b-2 ">
                                    <div className="col-span-12 md:col-span-1 text-sm">
                                        <div className="bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center">
                                            <span>{index + 1}</span>
                                        </div>
                                    </div>
                                    <span className="col-span-5 md:col-span-2 text-sm text-gray-500"><span className="font-bold text-gray-800">Date:</span> {new Date().toLocaleDateString()}</span>
                                    <span className=" col-span-6  md:col-span-2">
                                        <Image  src={product.image} alt={product.title}
                                               className="object-fill "
                                        />
                                    </span>
                                    <h1 className="col-span-12 md:col-span-3 font-bold text-gray-800"> {product.title}</h1>
                                    <span className="col-span-12 md:col-span-3 text-sm text-gray-500">Registering with Brand allows you to enjoy a seamless shopping experience, exclusive offers</span>

                                    <p className="col-span-12 md:col-span-1 text-sm text-yellow-500  ">Pending</p>
                                </div>
                            </li>
                        )
                    })
                }
            </ol>
      </div>
    );
};

export default MyOrders;