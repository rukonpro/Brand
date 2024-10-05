import React from 'react';
import SideBarToggleButton from "@/app/components/AdminDashboard/Sidebar/SidebarToggleButton";
import { FaXmark } from "react-icons/fa6";
import SideBarMenu from "@/app/components/AdminDashboard/Sidebar/SideBarMenu";
const MobileSidebar = () => {
    return (
        <div className="md:hidden">
            <aside
                id="mobileSidebar"
                className="bg-gray-800 text-white w-64 h-full fixed top-0 left-0 hidden z-40"
            >
               <div className="flex justify-between items-center p-4">
                   <div className=" text-center font-bold p-2">Admin Dashboard</div>
                   <SideBarToggleButton Icon={<FaXmark size={25}/>}/>
               </div>
                <SideBarMenu/>
            </aside>
        </div>
    );
};

export default MobileSidebar;