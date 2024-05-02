import React from 'react';
import fakeData from "@/app/FakeData/FakeData";
import Image from "next/image";

const MyOrders = () => {
    return (
        <div>
            <h1 className="text-xl font-bold text-gray-600 pb-5 px-3 md:px-0">My Orders</h1>

            <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-0.5">
                {
                    fakeData.products.slice(0,10).map((product,index)=>{
                        return(
                            <li key={index}>
                              <div className="flex items-center gap-2 bg-white p-3">
                                  <Image src={product.image} alt={product.title} height={50} width={50}
                                         className="object-fill"
                                  />
                                  <h1> {product.title}</h1>
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