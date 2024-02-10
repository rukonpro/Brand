import React from 'react';
import RequestsForm from './RequestsForm';
import BgImage from "@/public/images/image102.png"
const Requests = () => {
    return (
        <div>
            <div className='grid grid-cols-12  max-w-[1200px] mx-auto p-3 mt-5 rounded-lg bg-blue-500 requestConterner'

            >
                <div className='col-span-8'>
                    <h1 className='text-2xl font-extrabold text-white'>An easy way to send <br /> requests to all suppliers</h1>
                    <p className='text-sm text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing <br /> elit, sed do eiusmod tempor incididunt.</p>
                </div>

                <div className='col-span-4'>
                    <RequestsForm />
                </div>
            </div>
        </div>
    );
};

export default Requests;