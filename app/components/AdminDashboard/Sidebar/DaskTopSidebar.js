import React from 'react';
import SideBarMenu from "@/app/components/AdminDashboard/Sidebar/SideBarMenu";

const DaskTopSidebar = () => {
    return (
        <aside className="bg-gray-800 text-white hidden md:block  sticky top-0 h-screen">
            <div className="p-6  font-bold ">Admin Dashboard</div>
            <SideBarMenu/>

        </aside>
    );
};

export default DaskTopSidebar;