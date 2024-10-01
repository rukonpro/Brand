import React from 'react';
import Loader from "@/app/Loader";

const profileLoading = () => {
    return (
        <div className="flex justify-center items-center">
            <Loader/>
        </div>
    );
};

export default profileLoading;