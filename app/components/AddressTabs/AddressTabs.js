import React, { useState } from 'react';

const AddressTabs = ({ shippingComponent, billingComponent }) => {
    const [activeTab, setActiveTab] = useState('shipping');

    return (
        <div className="w-full  relative">
            {/* Tabs */}
            <div className="flex justify-around border-b dark:border-slate-700 relative">
                <button
                    className={`py-2  font-semibold relative transition-colors duration-300 ${activeTab === 'shipping'
                            ? 'text-blue-500'
                            : 'text-gray-500 dark:text-slate-300'
                        }`}
                    onClick={() => setActiveTab('shipping')}
                >
                    Shipping Address
                </button>
                <button
                    className={`py-2  font-semibold relative transition-colors duration-300 ${activeTab === 'billing'
                            ? 'text-blue-500'
                            : 'text-gray-500 dark:text-slate-300'
                        }`}
                    onClick={() => setActiveTab('billing')}
                >
                    Billing Address
                </button>

                {/* Animated underline */}
                <span
                    className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-transform duration-500 ease-in-out ${activeTab === 'shipping' ? 'translate-x-0' : 'translate-x-full'
                        } w-1/2`}
                />
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'shipping' ? (
                    <div>
                        {shippingComponent}
                    </div>
                ) : (
                    <div>
                        {billingComponent}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressTabs;
