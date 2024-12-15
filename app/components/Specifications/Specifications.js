import React from 'react';

const Specifications = ({ data }) => {
    return (
        <div className="w-full  my-10">
            <h3 className="text-lg font-bold  border-b-1 mb-4 pb-2">
                <span className="border-b-4 border-blue-500 pb-2">Specifications</span>
            </h3>
            <table className="w-full text-left border-collapse">
                <tbody>
                    {data?.map((data, index) => (
                        <tr
                        key={index}
                        className={`border dark:border-slate-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-900'
                            }`}
                    >
                        <th className="p-4 font-medium text-gray-700 dark:text-slate-100">{data?.name}</th>
                        <td className="p-4 text-gray-600 dark:text-slate-50">{data.value}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Specifications;
