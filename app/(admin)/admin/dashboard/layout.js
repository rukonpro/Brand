import React from 'react';
import Topbar from "@/app/components/AdminDashboard/Topbar/Topbar";
import Sidebar from "@/app/components/AdminDashboard/Sidebar/Sidebar";

const DashboardLayout = ({children}) => {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="flex-1 flex flex-col relative ">
                {/*<Topbar/>*/}
                <div className="p-3">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;