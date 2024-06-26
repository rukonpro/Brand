import React from 'react';
import Image from "next/image";
import visaCard from "@/public/images/visa-card.png";
import masterCard from "@/public/images/master-card.png";
import pPCard from "@/public/images/PP-Card.png";
import payCord from "@/public/images/Pay-card.png";

const CheckoutCard = () => {
    return (
        <div>
            <div className=" bg-white p-3 rounded-lg">
                <h1 className="font-bold">Have a coupon?</h1>
                <div className="grid grid-cols-5 pt-1">
                    <input
                        type="text"
                        name="coupon"
                        id="coupon"
                        placeholder="Add Coupon"
                        className="w-full col-span-3 px-2 py-1 border-2 rounded-l-lg"
                    />
                    <button type="button"
                            className="w-full col-span-2 px-2 py-1 border-2 border-l-0 text-sm font-bold focus:border rounded-r-lg"
                    >Apply
                    </button>
                </div>
            </div>

            <div className="bg-white p-3 rounded-lg mt-4">
                <div className="flex justify-between pb-2  text-gray-600">
                    <p> Subtotal:</p>
                    <p>$1403.97</p>
                </div>
                <div className="flex justify-between  text-gray-600">
                    <p> Discount:</p>
                    <p className="text-red-500">- $60.00</p>
                </div>
                <div className="flex justify-between border-b-2 py-2 text-gray-600">
                    <p>Tax:</p>
                    <p className="text-green-500">+ $14.00</p>
                </div>

                <div className="flex justify-between text-xl font-bold  py-3">
                    <p>Total:</p>
                    <p>$1357.97</p>
                </div>

                <div className="pt-8">
                    <button type="button"
                            className="text-xl bg-green-500 text-white px-5 py-2 rounded-lg w-full"
                    >Checkout
                    </button>
                </div>


                <div className="flex justify-center gap-x-2 pt-8">
                    <button type="button"
                            className="py-1 px-2 border-2 rounded-lg w-10 h-8 flex justify-center items-center">
                        <Image src={visaCard} alt="visa card"/>
                    </button>
                    <button type="button"
                            className="py-1 px-2 border-2 rounded-lg w-10 h-8 flex justify-center items-center">
                        <Image src={masterCard} alt="master Card"/>
                    </button>
                    <button type="button"
                            className="py-1 px-2 border-2 rounded-lg w-10 h-8 flex justify-center items-center">
                        <Image src={pPCard} alt="PP Card"/>
                    </button>
                    <button type="button"
                            className="py-1 px-2 border-2 rounded-lg w-10 h-8 flex justify-center items-center">
                        <Image src={payCord} alt="Pay Cord"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutCard;