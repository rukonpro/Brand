import React from 'react';

const MyCart = () => {
    return (
        <div>
            <div>
                <h1>Have a coupon?</h1>
                <div className="grid grid-cols-5 pt-1">
                    <input
                        type="text"
                        name="coupon"
                        id="coupon"
                        placeholder="Add Coupon"
                        className="w-full col-span-4 px-2 py-1 border"
                    />
                    <button type="button"
                            className="w-full col-span-1 px-2 py-1 border text-sm font-bold focus:border"
                    >Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyCart;