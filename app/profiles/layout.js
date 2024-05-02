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

                <div className="w-52 h-screen overflow-hidden md:block hidden  rounded-lg  sticky top-0 pl-3 py-3" >
                    <Sidebar/>
                </div>


                <div className=" flex-1 inset-0  p-0 md:p-3 relative ">
                    <div className="sticky top-0 w-full  md:rounded-lg  md:overflow-hidden">
                          <Navbar/>
                    </div>
                    <div
                    className="pt-5"
                    >{children}</div>
                    <div className="pt-8"/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;