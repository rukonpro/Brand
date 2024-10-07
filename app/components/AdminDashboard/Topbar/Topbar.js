import React from "react";
import SideBarToggleButton from "@/app/components/AdminDashboard/Sidebar/SidebarToggleButton";
import { IoReorderThree } from "react-icons/io5";
const Topbar = () => {
    return (
        <header className="bg-white shadow-md flex items-center justify-between p-4 sticky top-0 z-40">
            <SideBarToggleButton Icon={<IoReorderThree size={25}/>}/>
            <div className="font-bold text-xl">Admin Dashboard</div>
            <div className="flex items-center space-x-4">
                <button className="text-gray-500">🔔</button>
                <button className="text-gray-500">⚙️</button>
            </div>
        </header>
    );
};

export default Topbar;
