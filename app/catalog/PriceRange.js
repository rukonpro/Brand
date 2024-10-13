import { useState } from 'react';

export default function RangeSlider() {
    const [value, setValue] = useState([20, 100]);

    // Handle the minimum slider change
    const handleMinChange = (e) => {
        const newMin = Math.min(Number(e.target.value), value[1] - 1); // Prevent min from exceeding max
        setValue([newMin, value[1]]);
    };

    // Handle the maximum slider change
    const handleMaxChange = (e) => {
        const newMax = Math.max(Number(e.target.value), value[0] + 1); // Prevent max from being less than min
        setValue([value[0], newMax]);
    };

    return (
        <div className="p-4 py-8 border-t">
            {/* Slider Track */}
            <div className="relative h-2 bg-gray-300 rounded-full">
                {/* Selected Range */}
                <div
                    className="absolute h-2 bg-blue-500 rounded-full"
                    style={{
                        left: `${value[0]}%`,
                        right: `${100 - value[1]}%`,
                    }}
                ></div>

                {/* Min Slider */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value[0]}
                    onChange={handleMinChange}
                    className="absolute w-full -top-2 h-2 appearance-none bg-transparent pointer-events-auto"
                    style={{ zIndex: 3 }}
                />

                {/* Max Slider */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value[1]}
                    onChange={handleMaxChange}
                    className="absolute w-full -top-2 h-2 appearance-none bg-transparent pointer-events-auto"
                    style={{ zIndex: 2 }}
                />
            </div>

            {/* Display Min and Max Values */}
            <div className="flex justify-between mt-4">
                <span className="text-sm font-medium text-gray-700">Min: {value[0]}%</span>
                <span className="text-sm font-medium text-gray-700">Max: {value[1]}%</span>
            </div>
        </div>
    );
}
