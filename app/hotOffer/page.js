import React from 'react';
import HotOffer from "@/app/hotOffer/hotOffer";
import Navbar from "@/app/components/navbar/navbar";
import Nav from "@/app/components/navbar/nav";
import Footer from "@/app/components/Footer/Footer";

const hotOffer = () => {
    return (
        <div>
            <div className="sticky top-0 z-[20]">
                <Navbar />
            </div>
            <Nav />
            <div className="sm:px-3">
                <div className="max-w-[1200px] mx-auto my-5">
                    <h1 className="text-2xl py-5 sm:px-0 px-4">Deals and offers</h1>
                    <HotOffer/>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default hotOffer;