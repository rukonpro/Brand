import React from 'react';


const CreatorCard = ({Icon,title,path}) => {
    return (

            <div className="p-7 bg-white rounded-lg shadow-sm dark:bg-slate-700 cursor-pointer">
                <Icon size={100}/>
                <h1 className="text-lg font-bold">{title}</h1>
            </div>

    );
};

export default CreatorCard;