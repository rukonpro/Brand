import React from 'react';
import BackButton from "@/app/components/BackButtons/BackButton";

const CreateBrand = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg">Create a Brand</h1>
                <BackButton title="Back"/>
            </div>
        </div>
    );
};

export default CreateBrand;