import React from 'react';
import Link from "next/link";


const CreatorCard = ({Icon,title,path}) => {
    return (
        <Link href={path}>
            <div className="p-7 bg-white rounded-lg shadow-sm dark:bg-slate-700">
                <Icon size={150}/>
                <h1 className="text-lg font-bold">{title}</h1>
            </div>
        </Link>
    );
};

export default CreatorCard;