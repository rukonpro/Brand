import React from 'react';
import Image from "next/image";
import Link from "next/link";
import undraw_posting_photo_re_plk8 from "@/public/images/undraw_posting_photo_re_plk8.svg"
import removeFormLaterItemHandler from "@/app/components/SavedForLaterItems/removeFormLaterItemHandler";
import { IoCloseSharp } from "react-icons/io5";
const SavedForLaterCard = ({ product,handleDeleteForLater,id }) => {
    return (
        <div className="lg:border-2 border-blue-200 md:rounded-lg p-3 bg-white dark:bg-slate-700 dark:border-slate-700 relative">
            <button
                type="button"
                className="text-red-500  absolute right-0 top-0 z-10"
                onClick={() => {
                    handleDeleteForLater(id);
                }}
            >
                <IoCloseSharp size={25} />
            </button>
            <Link href={`/details/${product?.id}`}>
                <div>
                    <Image
                        src={product?.images?.[0] || undraw_posting_photo_re_plk8}
                        alt={product?.name || "undraw_posting_photo_re_plk8"}
                        height={112}
                        width={112}
                        className="w-full h-28 md:h-36 object-contain overflow-hidden"
                    />
                </div>
                {product?.name && <h1 className="text-xl font-bold text-black pt-2 dark:text-slate-50 truncate hover:text-clip">{product?.name}</h1>}
                {product?.basePrice && <p className="text-xl font-bold text-blue-500 pt-2 ">${product?.basePrice}</p>}

            </Link>

        </div>
    );
};

export default SavedForLaterCard;