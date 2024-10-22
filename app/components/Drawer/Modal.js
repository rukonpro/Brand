import React, { useEffect, useRef } from 'react';
import { IoMdClose } from "react-icons/io";
const Modal = ({ isOpen, onClose, title, children }) => {

    const modalRef = useRef(null);

    // Close modal if clicked outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); // Close modal if click is outside of modal content
            }
        };

        // Attach the event listener when modal is open
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        // Clean up the event listener when modal is closed
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;





    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                ref={modalRef}
                className="bg-white/30 dark:bg-slate-700/30 backdrop-blur-3xl rounded-lg shadow-lg w-full max-w-[1000px] p-6 relative mx-4 md:mx-0">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-500 dark:text-white hover:opacity-50"
                >
                    <IoMdClose size={25} />
                </button>

                {/* Modal Title */}
                <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-slate-100 mb-4">
                    {title}
                </h2>

                {/* Modal Content with Scrollbar */}
                <div className="max-h-[50vh] overflow-auto text-gray-600 dark:text-slate-300 text-sm md:text-base">
                    {children}
                </div>

                {/* Modal Actions */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
