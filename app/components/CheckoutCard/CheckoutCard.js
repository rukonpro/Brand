import React from 'react';
import Image from "next/image";
import visaCard from "@/public/images/visa-card.png";
import masterCard from "@/public/images/master-card.png";
import pPCard from "@/public/images/PP-Card.png";
import payCord from "@/public/images/Pay-card.png";


const CheckoutCard = ({ cartSummary, children, loading }) => {

    console.log(cartSummary)
    return (
        <div >
            <div className=" bg-white p-3 rounded-lg dark:bg-slate-800">
                <h1 className="font-bold">Have a coupon?</h1>
                <div className="grid grid-cols-5 pt-1">
                    <input
                        type="text"
                        name="coupon"
                        id="coupon"
                        placeholder="Add Coupon"
                        className="w-full col-span-3 px-2 py-1 border-2 rounded-l-lg dark:bg-slate-700 dark:text-slate-300 dark:border-slate-700"
                    />
                    <button type="button"
                        className="w-full col-span-2 px-2 py-1 border-2 border-l-0 text-sm font-bold focus:border rounded-r-lg dark:bg-slate-700  dark:border-slate-700"
                    >Apply
                    </button>
                </div>
            </div>

            <div className="bg-white p-3 rounded-lg mt-4 dark:bg-slate-800 ">
                <div className="flex justify-between pb-2  text-gray-600 dark:text-slate-200">
                    <p> Subtotal:</p>
                    <p>${cartSummary?.originalPrice?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between  text-gray-600 dark:text-slate-200">
                    <p> Discount({cartSummary?.discountPercent}%):</p>
                    <p className="text-red-500">- ${cartSummary?.totalDiscount?.toFixed(2)}</p>
                </div>
                <div className="flex justify-between border-b-2 py-2 text-gray-600 dark:text-slate-200 dark:border-slate-700">
                    <p>Tax({cartSummary?.taxPercent}%):</p>
                    <p className="text-green-500">+ ${cartSummary?.taxWithPrice?.toFixed(2)}</p>
                </div>

                <div className="flex justify-between text-xl font-bold  py-3">
                    <p>Total:</p>
                    <p>${cartSummary?.totalPrice?.toFixed(2)}</p>
                </div>

                {children}


                <div className="flex justify-center gap-x-2 pt-8">
                    <button type="button"
                        className="py-1 px-2 border-2 rounded-lg w-10 h-8 flex justify-center items-center dark:border-slate-700">
                        <Image src={visaCard} alt="visa card" />
                    </button>
                    <button type="button"
                        className="py-1 px-2 border-2 rounded-lg w-10 h-8 flex justify-center items-center dark:border-slate-700">
                        <Image src={masterCard} alt="master Card" />
                    </button>
                    <button type="button"
                        className="py-1 px-2 border-2 rounded-lg w-10 h-8 flex justify-center items-center dark:border-slate-700">
                        <Image src={pPCard} alt="PP Card" />
                    </button>
                    <button type="button"
                        className="py-1 px-2 border-2 rounded-lg w-10 h-8 flex justify-center items-center dark:border-slate-700">
                        <Image src={payCord} alt="Pay Cord" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutCard;