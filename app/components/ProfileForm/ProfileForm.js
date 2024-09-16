import React from 'react';

const ProfileForm = ({user}) => {
    return (
        <div className="grid sm:grid-cols-4 md:grid-cols-4 gap-4  px-3 md:px-0">
            <div className="col-span-2">
                <label htmlFor="first_name" className="text-lg">First Name:</label>
                <br/>
                <input type="text" id="first_name" name="first_name" placeholder="First Name"
                       defaultValue={user?.firstName} className="px-3 py-2 rounded-lg mt-1  w-full"/>
            </div>
            <div className="col-span-2">
                <label htmlFor="last_name" className="text-lg">Last Name:</label>
                <br/>
                <input type="text" id="last_name" name="last_name" placeholder="Last Name" defaultValue={user?.lastName}
                       className="px-3 py-2 rounded-lg mt-1  w-full"/>
            </div>
            <div>
                <label htmlFor="gender" className="text-lg">Gender:</label>
                <br/>
                <select id="gender" name="gender"
                        default={user?.gender}
                        className="px-3 py-2 rounded-lg mt-1 w-full bg-white">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
            </div>

            <div>
                <label htmlFor="date_of_birth" className="text-lg">Date of birth:</label>
                <br/>
                <input type="date" id="date_of_birth" name="date_of_birth"
                       className="px-3 py-2 rounded-lg mt-1  w-full"
                       defaultValue={user?.dateOfBirth}
                />
            </div>

            <div className="col-span-2">
                <label htmlFor="phone_number" className="text-lg">Phone Number:</label>
                <br/>
                <input type="text" id="phone_number" name="phone_number"
                       placeholder="Phone Number"
                       defaultValue={user?.phoneNumber}
                       className="px-3 py-2 rounded-lg mt-1  w-full"/>
            </div>

            <div className="col-span-2">
                <label htmlFor="Country" className="text-lg">Country:</label>
                <br/>
                <input type="text" id="Country" name="Country"
                       placeholder="Country"
                       defaultValue={user?.country}
                       className="px-3 py-2 rounded-lg mt-1  w-full"/>
            </div>
            <div className="col-span-2">
                <label htmlFor="house_or_office_number" className="text-lg">House/Office number:</label>
                <br/>
                <input type="text" id="house_or_office_number" name="house_or_office_number"
                       placeholder="House/Office number"
                       defaultValue={user?.houseNumber}
                       className="px-3 py-2 rounded-lg mt-1  w-full"


                />
            </div>
            <div className="col-span-2">
                <label htmlFor="street_name" className="text-lg">Street name:</label>
                <br/>
                <input type="text" id="street_name" name="street_name"
                       placeholder="Street name"
                       defaultValue={user?.street}
                       className="px-3 py-2 rounded-lg mt-1  w-full"/>
            </div>

            <div className="col-span-2">
                <label htmlFor="city" className="text-lg">City:</label>
                <br/>
                <input type="text" id="city" name="city"
                       placeholder="City"
                       defaultValue={user?.city}
                       className="px-3 py-2 rounded-lg mt-1  w-full"/>
            </div>

            <div>
                <label htmlFor="postal_code" className="text-lg">Postal code:</label>
                <br/>
                <input type="number" id="postal_code" name="postal_code"
                       placeholder="Postal code"
                       defaultValue={user?.postalCode}
                       className="px-3 py-2 rounded-lg mt-1  w-full"/>
            </div>


            <div>
                <label htmlFor="state_province" className="text-lg">State/Province:</label>
                <br/>
                <input type="text" id="state_province" name="state_province"
                       placeholder="State/Province"
                       defaultValue={user?.state}
                       className="px-3 py-2 rounded-lg mt-1  w-full"/>
            </div>
        </div>
    );
};

export default ProfileForm;