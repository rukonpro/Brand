export default function Drawer2({ isOpen, setIsOpen, children, title }) {
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleDrawer}
                ></div>
            )}

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-slate-800 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out shadow-lg`}
            >
                {/* Drawer Content */}
                <div className="p-6">
                    {/* Close Button */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
                        <button
                            onClick={toggleDrawer}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"
                        >
                            X
                        </button>
                    </div>

                    {/* Dynamic Children */}
                    {children}
                </div>
            </div>
        </>
    );
}
