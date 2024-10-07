import React from 'react';
const Loader = ({title}) => {
    return (
        <div className="py-4">
            {/* Central Loader Container */}
            <div className="flex gap-5 items-center">
                {/* Logo Placeholder or Brand Name */}
                <div className="flex items-center space-x-2">
                    <div className=" animate-pulse">
                       <h1>{title||"Loading..."}</h1>
                    </div>

                </div>

                {/* Animated Dots */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce duration-300 delay-500"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce duration-700 delay-1000"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;