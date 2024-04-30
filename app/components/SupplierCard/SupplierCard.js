import React from 'react';
import Image from "next/image";
import Avatar from "@/public/images/avatar.png";
import Flag from "@/public/images/AE@2x.png";
import verifiedICon from "@/public/images/VerifiedIcon.png";
import worldIcon from "@/public/images/worldIcon.png";

const SupplierCard = () => {
    return (
        <div className="border-2 rounded  p-2">
            <div className="flex gap-4 py-5">
                <Image src={Avatar} alt="Avatar" className="h-10 w-10 rounded-full"/>
                <div>
                    <h1>Supplier</h1>
                    <p>Guanjoi Trading LLC.</p>
                </div>
            </div>

            <ol className="  border-t-2 py-2">
                <li className="flex gap-4 items-center py-2">
                    <Image src={Flag} alt="Avatar" className="h-5 w-5"/> <p>Germany, Berlin</p>
                </li>
                <li className="flex gap-4 items-center py-2">
                    <Image src={verifiedICon} alt="verifiedICon" className="h-5 w-5"/> <p>Verified
                    Seller</p>
                </li>
                <li className="flex gap-4 items-center py-2">
                    <Image src={worldIcon} alt="worldIcon" className="h-5 w-5"/> <p>Worldwide
                    shipping</p>
                </li>
            </ol>

            <div>
                <button
                    className="w-full bg-blue-500 rounded-2xl py-2 text-white font-bold hover:bg-blue-600 ">Send
                    inquiry
                </button>
                <button
                    className="w-full bg-gray-100 rounded-2xl py-2 text-blue-500 font-bold hover:bg-gray-200 mt-2 ">{`Seller's Profile`}</button>
            </div>
        </div>
    );
};

export default SupplierCard;