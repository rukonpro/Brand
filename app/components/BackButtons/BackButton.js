"use client"
import React from 'react';
import Image from "next/image";
import backButtonIcon from "@/public/images/left-back-icon.png";

const BackButton = ({title}) => {
    return (
        <button
            onClick={() => window.history.back()}
            type="button"
            className="bg-blue-500 rounded-lg text-white px-3 py-1 flex items-center gap-x-2 hover:bg-blue-600"
        >
            <Image src={backButtonIcon} alt="back icon"/>{title}</button>
    );
};

export default BackButton;