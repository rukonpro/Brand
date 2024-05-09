import React from 'react';
import Sidebar from "@/app/components/sidebar/sidebar";

const MainLayout = ({children}) => {
    return (
        <div>
            <div className="max-w-[1200px] mx-auto">

                <div className=" grid grid-cols-12 relative">
                    <div
                        className="col-span-12 md:col-span-4 h-screen overflow-hidden md:block hidden  transition-transform duration-300 ease-in-out transform  sticky top-0 pl-3 py-3">
                        <Sidebar/>
                    </div>

                    <div className="col-span-12 md:col-span-8 pt-5  relative ">
                        <div className="pt-5 md:p-3"
                        >{children}</div>
                        <div className="pt-8"/>
                        <div className="md:pr-3">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;