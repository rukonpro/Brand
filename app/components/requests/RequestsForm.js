import React from 'react';

const RequestsForm = () => {
    return (
        <div className='backdrop-blur-md bg-slate-50/10 dark:bg-slate-600/10 p-5 rounded-lg'>
            <h1 className='text-lg font-extrabold text-white'>Send quote to suppliers</h1>
            <div className='pt-3'>
                <input type="text" placeholder='What item you need?' className='w-full px-2 py-3 placeholder:text-black border-2 border-white  bottom-2 rounded-lg bg-gray-100/50 dark:bg-slate-600/50 dark:text-slate-100 dark:placeholder:text-slate-200 dark:border-slate-500 ' />
            </div>
            <div className='pt-3'>
                <textarea placeholder='Type more details' className='w-full px-2 py-3 border-2 border-white bottom-2 rounded-lg placeholder:text-black bg-gray-100/50 dark:bg-slate-600/50 dark:text-slate-100 dark:placeholder:text-slate-200 dark:border-slate-500' />
            </div>

            <div className='grid grid-cols-3 gap-3 pt-2'>
                <input type="number" placeholder='Quntity' className='col-span-2 h-[40px] px-2 border-2 rounded-lg border-white placeholder:text-black bg-gray-100/50 dark:bg-slate-600/50 dark:text-slate-100 dark:placeholder:text-slate-200 dark:border-slate-500' />

                <select className='col-span-1 h-[40px] px-2  border-2 border-white rounded-lg   bg-gray-100/50 dark:bg-slate-600/50 dark:text-slate-100 dark:placeholder:text-slate-200 dark:border-slate-500'>
                    <option value="Pcs" className=" bg-gray-100/50">Pcs</option>
                    <option value="Pcs" className=" bg-gray-100/50">Pcs</option>
                    <option value="Pcs" className=" bg-gray-100/50">Pcs</option>
                </select>

            </div>

            <div className="pt-2">
            <button type='button'
                    className='bg-blue-500 px-3 py-2 rounded-lg text-white '
                >Send inquiry</button>
            </div>
        </div>
    );
};

export default RequestsForm;