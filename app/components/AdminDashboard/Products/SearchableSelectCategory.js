import React, { useState, useRef, useEffect } from 'react';

const SearchableSelectCategory = ({ options, label, name, formik,defaultName }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Recursive function to flatten options
    const flattenOptions = (opts) => {
        return opts?.reduce((acc, option) => {
            // If the option has children, recursively flatten them
            if (option.children && option?.children?.length > 0) {
                return [...acc, ...flattenOptions(option?.children)]; // Flatten children
            }
            return [...acc, option]; // Add the option itself if no children
        }, []);
    };

    // Get the combined options for the dropdown
    const combinedOptions = flattenOptions(options);

    // Filter options based on search term
    const filteredOptions = combinedOptions?.filter((option) =>
        option?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    const handleOptionSelect = ({categoryName,categoryId}) => {
        formik.setFieldValue(name, categoryId);
        setSearchTerm(categoryName); // Clear the search term
        setIsOpen(false);
    };

    // Handle click outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative mb-4 col-span-2" ref={dropdownRef}>
            <label className="block text-gray-700 dark:text-slate-300 text-left">{label}</label>

            {/* Searchable Input */}
            <input
                type="text"
                value={searchTerm||defaultName}
            
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="Search and select..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
            />

            {/* Dropdown Options */}
            {isOpen && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto dark:bg-slate-700 dark:border-slate-600">
                    {filteredOptions.length === 0 ? (
                        <li className="px-4 py-2 text-gray-500 dark:text-slate-300">No options found</li>
                    ) : (
                        filteredOptions.map((option) => (
                            <div
                                key={option?.id}
                                onClick={() => handleOptionSelect({categoryName:option?.name,categoryId:option?.id})}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 dark:text-slate-300 text-left"
                            >
                                {option?.name}
                            </div>
                        ))
                    )}
                </ul>
            )}

            {/* Formik Validation Error */}
            {formik.touched[name] && formik.errors[name] ? (
                <div className="text-red-500">{formik.errors[name]}</div>
            ) : null}
        </div>
    );
};

export default SearchableSelectCategory;
