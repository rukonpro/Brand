// "use client"
// import React, {useState} from 'react';
// import Sidebar from "@/app/components/AdminDashboard/Sidebar/Sidebar";
// import Navbar from "@/app/components/navbar/navbar";
//
// const DashboardLayout = ({children}) => {
//     const [isOpen, setIsOpen] = useState(true);
//     return (
//         <div className={`overflow-x-hidden  transition-all duration-300 relative ${isOpen ? 'ml-72' : 'ml-16'}`}>
//                 <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
//             <div className="relative">
//                 <div className="sticky top-0 z-[20]">
//                     <Navbar/>
//                 </div>
//                 {children}
//             </div>
//         </div>
//     );
// };
//
// export default DashboardLayout;
import React from 'react';
import MobileSidebar from "@/app/components/AdminDashboard/Sidebar/MobileSidebar";
import DaskTopSidebar from "@/app/components/AdminDashboard/Sidebar/DaskTopSidebar";
import Topbar from "@/app/components/AdminDashboard/Topbar/Topbar";

const LayoutDashboardLayout = ({children}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen transition-all duration-700 relative">
            {/* Sidebar */}
           <div className="sticky top-0 bottom-0">
               <DaskTopSidebar/>
           </div>

            {/* Mobile Sidebar */}

          <MobileSidebar/>

            {/* Main Content */}
            <div className="flex-1 grid grid-rows-[auto_1fr] relative overflow-auto">
                {/* Topbar */}
                <Topbar/>

                {/* Main Content Area */}
                <main className="p-3 bg-gray-100 ">
                    
                    {children}
                    
                    </main>
            </div>
        </div>
    );
};

export default LayoutDashboardLayout;