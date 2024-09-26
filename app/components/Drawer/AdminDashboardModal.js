
import React from 'react';
import { IoCloseSharp } from "react-icons/io5";


const AdminDashboardModal = ({isOpen,handleCloseModal,children}) => {

    return (
        <div>
            <div className={`fixed flex justify-center items-center h-full  w-full inset-0 z-50 overflow-hidden  duration-700  ${isOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={handleCloseModal}>
                    <div className="absolute inset-0 backdrop-blur-sm "></div>
                </div>
                <div className="relative">
                    <button
                        onClick={handleCloseModal}
                        className="absolute right-0 z-10">
                        <IoCloseSharp size={25}/>
                    </button>
                    <div
                        className={` max-w-[700px] max-h-[600px] h-full border-2 border-slate-50 dark:border-slate-700  w-full  bg-white/50 dark:bg-gray-800/50 backdrop-blur-3xl shadow-xl overflow-hidden overflow-y-auto transform transition ease-in-out duration-700 rounded-lg relative`}>


                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardModal;
