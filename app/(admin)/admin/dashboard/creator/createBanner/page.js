import React from 'react';
import BackButton from "@/app/components/BackButtons/BackButton";

const CreateBanner = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg">CCreate a banner</h1>
                <BackButton title="Back"/>
            </div>
        </div>
    );
};

export default CreateBanner;