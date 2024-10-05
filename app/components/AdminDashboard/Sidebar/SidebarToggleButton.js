"use client"
import React from 'react';

const SideBarToggleButton = ({Icon}) => {
    return (
        <button
            className=" p-2 rounded-md  md:hidden block"
            onClick={() =>
                document.getElementById("mobileSidebar").classList.toggle("hidden")
            }
        >
            {Icon}
        </button>
    );
};

export default SideBarToggleButton;