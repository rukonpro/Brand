import React, { useState } from "react";

const DropdownCategory = ({ options }) => {
    const [selectedOptions, setSelectedOptions] = useState({});

    const handleSelect = (label) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const renderOptions = (options) => {
        return (
            <ul>
                {options.map((option) => (
                    <li key={option.label}>
                        <div>
                            <input
                                type="checkbox"
                                checked={selectedOptions[option.label] || false}
                                onChange={() => handleSelect(option.label)}
                            />
                            {option.label}
                        </div>
                        {option.children && selectedOptions[option.label] && (
                            <div style={{ paddingLeft: "20px" }}>
                                {renderOptions(option.children)}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return <div>{renderOptions(options)}</div>;
};

export default DropdownCategory;
