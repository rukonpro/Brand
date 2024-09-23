"use client"
import React, {useState,useEffect} from 'react';



const setLocalStorageItem = async (key, value) => {
    return new Promise((resolve) => {
        localStorage.setItem(key, value);
        resolve(true);
    });
};

// Async localStorage getter
const getLocalStorageItem = async (key) => {
    return new Promise((resolve) => {
        const value = localStorage.getItem(key);
        resolve(value);
    });
};
const DarkAndLightModeController = () => {
    const [theme, setTheme] = useState(null); // Start with null to determine theme from system or storage
    const [loading, setLoading] = useState(true); // Loading state

    // Async function to initialize theme
    const initializeTheme = async () => {
        const savedTheme = await getLocalStorageItem('theme');

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
        setLoading(false); // Stop loading once theme is applied
    };

    useEffect(() => {
        initializeTheme(); // Initialize theme asynchronously
    }, []);

    // Async effect to apply theme changes
    useEffect(() => {
        if (theme !== null) {
            const applyTheme = async () => {
                setLoading(true); // Start loading when theme change begins

                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    await setLocalStorageItem('theme', 'dark'); // Save user-selected theme
                } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    await setLocalStorageItem('theme', 'light'); // Save user-selected theme
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

                setLoading(false); // Stop loading once theme is applied
            };

            applyTheme(); // Apply theme asynchronously
        }
    }, [theme]);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-8">
                Toggle Dark, Light, and System Mode
            </h1>
            {loading ? (
                <p className="text-lg text-gray-500 dark:text-gray-300">Loading theme...</p>
            ) : (
                <div className="flex space-x-4">
                    <button
                        onClick={() => setTheme('dark')}
                        className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
                    >
                        Dark Mode
                    </button>
                    <button
                        onClick={() => setTheme('light')}
                        className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
                    >
                        Light Mode
                    </button>
                    <button
                        onClick={() => setTheme('system')}
                        className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
                    >
                        System Default
                    </button>
                </div>
            )}
        </div>
    );
};

export default DarkAndLightModeController;