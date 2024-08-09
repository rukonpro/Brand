import Image from 'next/image';
import React from 'react';
import GridViewIcon from "@/public/images/gridview.png";
import LineViewIcon from "@/public/images/listview.png";

const CatalogNav = ({setGitView}) => {
    return (
        <nav className=" grid grid-cols-2 items-center gap-3 rounded-md w-full flex-row bg-white  p-3">
            <span className="inline-block  text-sm text-gray-700">
                12,911 items in Mobile accessory
            </span>

            <div className="grid grid-cols-4 items-center">
                <div className="col-span-3 flex justify-end">
                    <label htmlFor="item1"
                        className="text-sm text-gray-700"
                        role="menuitem" tabIndex="-1">
                        <input
                            type="checkbox"
                            id="item1"
                            className="mr-2"
                        />
                        Verified only
                    </label>
                </div>

                <div className="col-span-1">
                    <button type="button"
                        onClick={() => setGitView(true)}
                        className="mx-2"
                    >
                        <Image src={GridViewIcon} alt="grid view icon" height={20} width={20} />
                    </button>
                    <button type="button"
                        onClick={() => setGitView(false)}
                        className="mx-2"
                    >
                        <Image src={LineViewIcon} alt="Line view icon" height={20} width={20} />
                    </button>
                </div>
            </div>

        </nav>
    );
};

export default CatalogNav;