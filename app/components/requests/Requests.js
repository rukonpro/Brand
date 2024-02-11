import React from 'react';
import RequestsForm from './RequestsForm';
const Requests = () => {
    return (
        <div className="px-3">
            <div className='grid grid-cols-12 gap-y-10  max-w-[1200px] mx-auto md:p-10 p-3 mt-5 rounded-lg bg-blue-500 bg-cover bg-no-repeat requestConterner'

            >
                <div className='md:col-span-8 col-span-12'>
                    <h1 className='text-4xl font-extrabold text-white'>An easy way to send <br /> requests to all suppliers</h1>
                    <p className='text-base text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing <br /> elit, sed do eiusmod tempor incididunt.</p>
                </div>

                <div className='md:col-span-4 col-span-12'>
                    <RequestsForm />
                </div>
            </div>
        </div>
    );
};

export default Requests;