import React from 'react';

const VariantCatd = ({ data }) => {
    return (


        <table className="w-full text-left border-collapse">
            <tbody>
                {data?.color && <tr

                    className={`border dark:border-slate-700 bg-gray-50 dark:bg-slate-800`}
                >
                    <th className="p-0.5 px-1 font-medium text-gray-700 dark:text-slate-100">Color:</th>
                    <td className="p-0.5 px-1 text-gray-600 dark:text-slate-50">{data?.color}</td>
                </tr>}
                {data?.size && <tr

                    className={`border dark:border-slate-700 bg-gray-50 dark:bg-slate-800`}
                >
                    <th className="p-0.5 px-1 font-medium text-gray-700 dark:text-slate-100">Size:</th>
                    <td className="p-0.5 px-1 text-gray-600 dark:text-slate-50">{data?.size}</td>
                </tr>}

                {data?.price && <tr

                    className={`border dark:border-slate-700 bg-gray-50 dark:bg-slate-800`}
                >
                    <th className="p-0.5 px-1 font-medium text-gray-700 dark:text-slate-100">Price:</th>
                    <td className="p-0.5 px-1 text-gray-600 dark:text-slate-50">{data?.price}</td>
                </tr>}

                {data?.material && <tr

                    className={`border dark:border-slate-700 bg-gray-50 dark:bg-slate-800`}
                >
                    <th className="p-0.5 px-1 font-medium text-gray-700 dark:text-slate-100">Material:</th>
                    <td className="p-0.5 px-1 text-gray-600 dark:text-slate-50">{data?.material}</td>
                </tr>}
                {data?.dimensions && <tr

                    className={`border dark:border-slate-700 bg-gray-50 dark:bg-slate-800`}
                >
                    <th className="p-0.5 px-1 font-medium text-gray-700 dark:text-slate-100">Dimensions:</th>
                    <td className="p-0.5 px-1 text-gray-600 dark:text-slate-50">{data?.dimensions}</td>
                </tr>}

                {data?.weight && <tr

                    className={`border dark:border-slate-700 bg-gray-50 dark:bg-slate-800`}
                >
                    <th className="p-0.5 font-medium text-gray-700 dark:text-slate-100">Weight:</th>
                    <td className="p-0.5 text-gray-600 dark:text-slate-50">{data?.weight}</td>
                </tr>}

            </tbody>
        </table>

    );
};

export default VariantCatd;