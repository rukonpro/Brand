// components/Layout/Topbar.js
import { FaBell, FaSearch, FaUserCircle } from 'react-icons/fa';

const Topbar = () => {
    return (
        <div className="bg-white dark:bg-slate-800 shadow flex items-center justify-between p-4 sticky top-0">
            <div className="relative w-full max-w-xs">
                <input
                    type="text"
                    className="bg-gray-200 dark:bg-slate-700 w-full px-4 py-2 rounded-full focus:outline-none"
                    placeholder="Search..."
                />
                <FaSearch className="absolute top-3 right-3 text-gray-400" />
            </div>
            <div className="flex items-center space-x-6">
                <FaBell className="text-xl text-gray-600 dark:text-slate-300 cursor-pointer" />
                <FaUserCircle className="text-2xl text-gray-600 dark:text-slate-300 cursor-pointer" />
            </div>
        </div>
    );
};

export default Topbar;
