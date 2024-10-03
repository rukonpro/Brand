"use client"
import React, {useState} from 'react';
import Sidebar from "@/app/components/AdminDashboard/Sidebar/Sidebar";
import Navbar from "@/app/components/navbar/navbar";

const DashboardLayout = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={`overflow-x-hidden  transition-all duration-300 relative ${isOpen ? 'ml-72' : 'ml-16'}`}>
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className="relative">
                <div className="sticky top-0 z-[20]">
                    <Navbar/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
