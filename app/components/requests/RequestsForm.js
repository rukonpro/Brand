import React from 'react';

const RequestsForm = () => {
    return (
        <div>
            <h1 className='text-white text-2xl font-extrabold'>Send quote to suppliers</h1>
            <br />

            <input type="text" placeholder='What item you need?' className='w-full px-2 py-3 border bottom-2 rounded-lg' />
            <br />
            <br />
            <textarea placeholder='Type more details' className='w-full px-2 py-3 border bottom-2 rounded-lg' />
        </div>
    );
};

export default RequestsForm;