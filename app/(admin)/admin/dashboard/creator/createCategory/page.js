import React from 'react';
import BackButton from "@/app/components/BackButtons/BackButton";

const CreateCategory = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-lg">Create a Category</h1>
                <BackButton title="Back"/>
            </div>
        </div>
    );
};

export default CreateCategory;