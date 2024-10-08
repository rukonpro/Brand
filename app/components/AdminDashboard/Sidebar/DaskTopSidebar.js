import React from 'react';
import SideBarMenu from "@/app/components/AdminDashboard/Sidebar/SideBarMenu";

const DaskTopSidebar = () => {
    return (
        <aside className=" w-full h-full">
            <div className="p-6  font-bold ">Admin Dashboard</div>
            <SideBarMenu/>

        </aside>
    );
};

export default DaskTopSidebar;