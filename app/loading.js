import React from 'react';
import Logo from "@/public/images/logo-colored.png";
import Image from "next/image";
const Loader = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
            {/* Central Loader Container */}
            <div className="flex flex-col items-center space-y-8">
                {/* Logo Placeholder or Brand Name */}
                <div className="flex items-center space-x-2">
                    <div className=" animate-pulse">
                        <Image src={Logo} width={100} height="auto" alt="Brand logo"/>
                    </div>

                </div>

                {/* Animated Dots */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce duration-300 delay-500"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce duration-700 delay-1000"></div>
                </div>

                {/* Loader Message */}
                <p className="text-slate-500 dark:text-slate-400">Loading the best deals for you...</p>
            </div>
        </div>
    );
};

export default Loader;