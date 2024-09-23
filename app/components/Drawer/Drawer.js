"use client"

const Drawer = ({isDrawerOpen, handleClose,children,destination }) => {


    return (
        <div className={`fixed inset-0 z-10 overflow-hidden  duration-700  ${isDrawerOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={handleClose}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className={`fixed inset-y-0 ${destination}-0 flex max-w-xs w-full bg-blue-200 dark:bg-slate-700  shadow-xl transform transition ease-in-out duration-300 overflow-y-auto`}>
                {children}
            </div>
        </div>
    );
};

export default Drawer;