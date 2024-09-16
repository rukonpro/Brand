import React from 'react';
import BackButton from "@/app/components/BackButtons/BackButton";

const Layout = ({children}) => {
    return (
        <div>
            <div className="flex justify-between items-center pb-5 px-3 md:px-0">
                <h1 className="text-xl font-bold">Checkout</h1>
                <BackButton title="Back"/>
            </div>
            {children}
        </div>
    );
};

export default Layout;