"use client"
import React, {useState,useEffect} from 'react';
import DarkModeIcon from "@/public/images/dark-mode.png";
import LightModeIcon from "@/public/images/light-mode.png";
import SystemModeIcon from "@/public/images/system-mode.png";
import Image from "next/image";


//
// const setLocalStorageItem = async (key, value) => {
//     return new Promise((resolve) => {
//         localStorage.setItem(key, value);
//         resolve(true);
//     });
// };
//
// // Async localStorage getter
// const getLocalStorageItem = async (key) => {
//     return new Promise((resolve) => {
//         const value = localStorage.getItem(key);
//         resolve(value);
//     });
// };


const DarkAndLightModeController = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const [theme, setTheme] = useState(null); // Start with null to determine theme from system or storage


    // Async function to initialize theme
    const initializeTheme = async () => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            // If a saved theme is found, use that theme
            setTheme(savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else {
            // No saved theme, check system preference
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemPrefersDark) {
                setTheme('dark');
                document.documentElement.classList.add('dark');
            } else {
                setTheme('light');
                document.documentElement.classList.remove('dark');
            }
        }

    };

    useEffect(() => {
        initializeTheme(); // Initialize theme asynchronously
    }, []);

    // Async effect to apply theme changes
    useEffect(() => {
        if (theme !== null) {
            const applyTheme = async () => {

                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark'); // Save user-selected theme
                } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light'); // Save user-selected theme
                } else if (theme === 'system') {
                    // If system theme is selected, remove saved theme and apply system preference
                    localStorage.removeItem('theme');
                    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (systemPrefersDark) {
                        document.documentElement.classList.add('dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                    }
                }

            };

            applyTheme(); // Apply theme asynchronously
        }
    }, [theme]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <div className="relative">
            {/* Dropdown Button */}
            <button
                onClick={toggleDropdown}
            >
              <div className="flex items-center justify-center">
                  <Image src={theme==="dark"?DarkModeIcon:theme==="light"?LightModeIcon:SystemModeIcon} height={25} width={25} alt="theme"/>
              </div>
                <p className="text-sm text-center  sm:block hidden">Theme</p>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="absolute mt-2 bg-white dark:bg-slate-700 rounded shadow-lg w-48 right-0">
                    <button
                        onClick={() => {
                            setTheme('dark');
                            setDropdownOpen(false);
                        }}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
                    >
                        {/* Dark Mode Icon (Moon) */}
                        <Image src={DarkModeIcon} height={25} width={25} alt="theme"/>
                        Dark Mode
                    </button>
                    <button
                        onClick={() => {
                            setTheme('light');
                            setDropdownOpen(false);
                        }}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
                    >
                        {/* Light Mode Icon (Sun) */}
                        <Image src={LightModeIcon} height={25} width={25} alt="theme"/>
                        Light Mode
                    </button>
                    <button
                        onClick={() => {
                            setTheme('system');
                            setDropdownOpen(false);
                        }}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
                    >
                        {/* System Mode Icon (Monitor) */}
                        <Image src={SystemModeIcon} height={25} width={25} alt="theme"/>
                        System Default
                    </button>
                </div>
            )}
        </div>
    );
};

export default DarkAndLightModeController;