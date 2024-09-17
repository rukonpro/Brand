import React from 'react';
import TailwindPagination from "@/app/components/TailwindPagination/TailwindPagination";
import Dropdown from "@/app/components/ShippingAdressDropdown/ShippingAdressDropdown";

const ShippingCard = ({shippingAddress,setCurrentPage,currentPage,setNewAddress}) => {

    return (
        <div className="border p-4 rounded-lg bg-white">

            {shippingAddress?.addresses?.map((address) => (
                <div key={address?.id}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-md text-slate-700 font-semibold mb-4 ">Shipping Address:</h2>
                        <Dropdown setNewAddress={setNewAddress}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <span className="block text-sm font-semibold text-gray-500">First Name</span>
                            <span className="block text-lg font-medium">{address.firstName}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-semibold text-gray-500">Last Name</span>
                            <span className="block text-lg font-medium">{address.lastName}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-semibold text-gray-500">Phone</span>
                            <span className="block text-lg font-medium">{address.phoneNumber}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-semibold text-gray-500">Country</span>
                            <span className="block text-lg font-medium">{address.country}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <span className="block text-sm font-semibold text-gray-500">House/Office No</span>
                            <span className="block text-lg font-medium">{address.houseNumber}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-semibold text-gray-500">Street</span>
                            <span className="block text-lg font-medium">{address.street}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-semibold text-gray-500">City</span>
                            <span className="block text-lg font-medium">{address.city}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-semibold text-gray-500">Postal Code</span>
                            <span className="block text-lg font-medium">{address.postalCode}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-semibold text-gray-500">State/Province</span>
                            <span className="block text-lg font-medium">{address.street}</span>
                        </div>
                    </div>


                    <TailwindPagination
                        totalPages={shippingAddress.pagination?.totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}/>
                </div>
            ))}
        </div>
    );
};

export default ShippingCard;