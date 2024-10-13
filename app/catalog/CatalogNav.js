import Image from 'next/image';
import React from 'react';
import GridViewIcon from "@/public/images/gridview.png";
import LineViewIcon from "@/public/images/listview.png";
import { GrCatalog } from "react-icons/gr";
const CatalogNav = ({ setGitView, itemsCount, handleToggleDrawer }) => {
    return (
        <nav className="flex justify-between items-center gap-3 rounded-md w-full flex-row bg-white  p-3 sticky top-0">

            <button
                type='button'
                onClick={handleToggleDrawer}
                className='md:hidden block'
            >
                <GrCatalog size={25}/>
            </button>
            <span className="inline-block  text-sm text-gray-700">
                {itemsCount} items {/*in Mobile accessory*/}
            </span>

            <div >


                <div >
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