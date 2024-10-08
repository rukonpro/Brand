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
        <div className="grid grid-cols-12 relative">
            {/* Sidebar */}
           <div className=" bg-gray-800 text-white hidden md:block  sticky top-0 h-screen md:col-span-2 ">
               <DaskTopSidebar/>
           </div>

            {/* Mobile Sidebar */}

          <MobileSidebar/>


                {/* Main Content Area */}
                <main className="  bg-gray-100 md:col-span-10 col-span-12">
                    
                    {children}
                    
                </main>
         
        </div>
    );
};

export default LayoutDashboardLayout;