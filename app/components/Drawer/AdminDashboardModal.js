import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";

const AdminDashboardModal = ({ isOpen, handleCloseModal, children, title }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const [isResizing, setIsResizing] = useState(false);
    const [size, setSize] = useState({ width: 700, height: 600 });
    const [startSize, setStartSize] = useState({ width: 700, height: 600 });

    // For moving the modal
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - startPosition.x,
                y: e.clientY - startPosition.y,
            });
        } else if (isResizing) {
            setSize({
                width: e.clientX - startPosition.x + startSize.width,
                height: e.clientY - startPosition.y + startSize.height,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    // For resizing the modal
    const handleResizeMouseDown = (e) => {
        e.stopPropagation(); // Prevent starting drag while resizing
        setIsResizing(true);
        setStartPosition({
            x: e.clientX,
            y: e.clientY,
        });
        setStartSize({
            width: size.width,
            height: size.height,
        });
    };

    return (
        <div>
            <div
                className={`fixed flex justify-center items-center h-full w-full inset-0 z-50 overflow-hidden transition-transform duration-700 ease-in-out ${isOpen ? 'translate-x-0 translate-y-0 opacity-100' : '-translate-x-full -translate-y-full opacity-0'}`}
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {/* Overlay */}
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={handleCloseModal}>
                    <div className="absolute inset-0 backdrop-blur-sm"></div>
                </div>

                {/* Modal Container */}
                <div
                    className="relative"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        width: `${size.width}px`,
                        height: `${size.height}px`,
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between w-full p-5 absolute z-10 backdrop-blur-3xl rounded-t-lg border-2 border-slate-50 dark:border-slate-700 cursor-move">
                        <h1 className="text-xl sm:text-2xl font-semibold ml-3">{title}</h1>
                        <button
                            onClick={handleCloseModal}
                            className="dark:hover:bg-slate-700 rounded-full"
                        >
                            <IoCloseSharp size={25} />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div
                        className={`pt-16 h-full border-2 border-slate-50 dark:border-slate-700 bg-slate-200/50 dark:bg-gray-800/50 backdrop-blur-3xl shadow-xl overflow-hidden overflow-y-auto transform transition-all ease-in-out duration-700 rounded-lg relative`}
                    >
                        {children}
                    </div>

                    {/* Resizer (bottom-right corner) */}
                    <div
                        className="absolute bottom-0 right-0 w-6 h-6 bg-transparent cursor-se-resize"
                        onMouseDown={handleResizeMouseDown}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardModal;
