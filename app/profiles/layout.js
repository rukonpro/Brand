"use client"
import React, {useState} from 'react';
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/Footer/Footer";
import Sidebar from "@/app/components/sidebar/sidebar";

const MainLayout = ({children}) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="max-w-[1200px] mx-auto">

            <div className=" flex relative ">

                <div className=" h-screen overflow-hidden md:block hidden  transition-transform duration-300 ease-in-out transform  sticky top-0 pl-3 py-3" >
                    <Sidebar/>
                </div>


                <div className=" flex-1 inset-0  p-0  relative ">
                    <div className=" md:p-3 sticky top-0 z-[10] ">
                        <div className="   w-full  md:rounded-lg md:overflow-hidden shadow-xl shadow-slate-300/50">
                            <Navbar/>
                        </div>
                    </div>

                    <div
                        className="pt-5 md:p-3"
                    >{children}</div>
                    <div className="pt-8"/>
                    <div className="md:pr-3">
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;