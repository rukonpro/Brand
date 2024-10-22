import React from 'react';

const SpecificationsSkeleton = () => {
    return (
        <div className="w-full my-10">
            {/* Heading Skeleton */}
            <h3 className="text-lg font-bold border-b-1 mb-4 pb-2">
                <span className="border-b-4 border-blue-500 pb-2">Specifications</span>
            </h3>

            {/* Skeleton for Specifications Table */}
            <table className="w-full text-left border-collapse">
                <tbody>
                    {/* Skeleton Rows */}
                    {[1, 2, 3, 4].map((item, index) => (
                        <tr
                            key={index}
                            className={`border dark:border-slate-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-900'
                                }`}
                        >
                            {/* Key Placeholder */}
                            <th className="p-4 font-medium">
                                <div className="h-4 w-24 bg-gray-300 rounded-md dark:bg-slate-700"></div>
                            </th>
                            {/* Value Placeholder */}
                            <td className="p-4">
                                <div className="h-4 w-32 bg-gray-300 rounded-md dark:bg-slate-700"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SpecificationsSkeleton;
