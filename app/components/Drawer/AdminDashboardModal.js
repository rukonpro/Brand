
import React from 'react';
import { IoCloseSharp } from "react-icons/io5";


const AdminDashboardModal = ({isOpen,handleCloseModal,children,title}) => {

    return (
        <div>
            <div className={`fixed flex justify-center items-center h-full  w-full inset-0 z-50 overflow-hidden  duration-700  ${isOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={handleCloseModal}>
                    <div className="absolute inset-0 backdrop-blur-sm "></div>
                </div>
                <div className="relative my-5 ">
                    <button
                        onClick={handleCloseModal}
                        className="absolute right-5 top-1  z-10 ">
                        <IoCloseSharp size={25}/>
                    </button>

                        <h1 className="text-xl sm:text-2xl font-semibold  ml-3 absolute left-3 top-3  z-10">{title}</h1>

                    <div
                        className={` max-w-[700px] max-h-[600px] pt-11 h-full border-2 border-slate-50 dark:border-slate-700  w-full  bg-white/50 dark:bg-gray-800/50 backdrop-blur-3xl shadow-xl overflow-hidden overflow-y-auto transform transition ease-in-out duration-700 rounded-lg relative`}>


                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardModal;
