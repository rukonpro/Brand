"use client";

import React, { useState, useEffect } from 'react';
import DarkModeIcon from "@/public/images/dark-mode.png";
import LightModeIcon from "@/public/images/light-mode.png";
import SystemModeIcon from "@/public/images/system-mode.png";
import Image from "next/image";

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
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0f172a'); // Dark mode theme color
            } else {
                document.documentElement.classList.remove('dark');
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff'); // Light mode theme color
            }
        } else {
            // No saved theme, check system preference
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemPrefersDark) {
                setTheme('dark');
                document.documentElement.classList.add('dark');
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0f172a'); // System dark mode theme color
            } else {
                setTheme('light');
                document.documentElement.classList.remove('dark');
                document.querySelector('meta[name="theme-color"]').setAttribute('content', '#dbeafe'); // System light mode theme color
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
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000'); // Dark mode theme color
                } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light'); // Save user-selected theme
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#dbeafe'); // Light mode theme color
                } else if (theme === 'system') {
                    // If system theme is selected, remove saved theme and apply system preference
                    localStorage.removeItem('theme');
                    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (systemPrefersDark) {
                        document.documentElement.classList.add('dark');
                        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000'); // System dark mode theme color
                    } else {
                        document.documentElement.classList.remove('dark');
                        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#dbeafe'); // System light mode theme color
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
            <button onClick={toggleDropdown}>
                <div className="flex items-center justify-center">
                    <Image
                        src={theme === "dark" ? DarkModeIcon : theme === "light" ? LightModeIcon : SystemModeIcon}
                        height={25}
                        width={25}
                        alt="system icon"
                    />
                </div>
                <p className="text-sm text-center sm:block hidden">Theme</p>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div className="absolute mt-2 bg-white dark:bg-slate-700 rounded shadow-lg w-48 right-0 z-50">
                    <button
                        onClick={() => {
                            setTheme('dark');
                            setDropdownOpen(false);
                        }}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
                    >
                        <Image src={DarkModeIcon} height={25} width={25} alt="Dark mode icon" />
                        Dark Mode
                    </button>
                    <button
                        onClick={() => {
                            setTheme('light');
                            setDropdownOpen(false);
                        }}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
                    >
                        <Image src={LightModeIcon} height={25} width={25} alt="Light mode icon" />
                        Light Mode
                    </button>
                    <button
                        onClick={() => {
                            setTheme('system');
                            setDropdownOpen(false);
                        }}
                        className="flex gap-3 items-center p-2 hover:bg-gray-100 dark:hover:bg-slate-700 w-full"
                    >
                        <Image src={SystemModeIcon} height={25} width={25} alt="System mode icon" />
                        System Default
                    </button>
                </div>
            )}
        </div>
    );
};

export default DarkAndLightModeController;