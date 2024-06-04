import React from 'react';
import LoadingIcon from "@/public/images/loading-gray-color-svgrepo-com.svg";
import Image from "next/image";
const Loading = () => {
    return (
        <div>
            <div className="flex items-center gap-4 w-min">
                <Image src={LoadingIcon} height={50} width={50} alt="loading icon" className="animate-spin" />
                <h1 className="text-3xl text-gray-600"> Loading...</h1>
            </div>
        </div>
    );
};

export default Loading;