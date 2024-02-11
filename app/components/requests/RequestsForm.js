import React from 'react';

const RequestsForm = () => {
    return (
        <div className='bg-white p-5 rounded-lg'>
            <h1 className='text-lg font-extrabold'>Send quote to suppliers</h1>
            <div className='pt-3'>
                <input type="text" placeholder='What item you need?' className='w-full px-2 py-3 border bottom-2 rounded-lg' />
            </div>
            <div className='pt-3'>
                <textarea placeholder='Type more details' className='w-full px-2 py-3 border bottom-2 rounded-lg' />
            </div>

            <div className='grid grid-cols-3 gap-3 pt-2'>
                <input type="number" placeholder='Quntity' className='col-span-2 h-[40px] px-2 border rounded-lg' />
                <select className='col-span-1 h-[40px] px-2 bg-white border rounded-lg'>
                    <option value="Pcs">Pcs</option>
                </select>
            </div>

            <div className="pt-2">
                <button type='button'
                    className='bg-blue-500 px-3 py-2 rounded-lg text-white'
                >Send inquiry</button>
            </div>
        </div>
    );
};

export default RequestsForm;