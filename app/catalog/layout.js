import React from 'react';
import CatalogAside from "@/app/catalog/CatalogAside";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/navbar/navbar";

const CatalogLayout = ({children}) => {
    return (
        <div>
            <div className="sticky top-0 z-[20]">
                <Navbar/>
            </div>
            <div className=" p-3 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    <CatalogAside/>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default CatalogLayout;