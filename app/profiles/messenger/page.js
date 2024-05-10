import React from 'react';
import {getUser} from "@/app/lib/dal";

const Messenger = async () => {

    const user=await getUser();

    return (
        <div>
            messenger
        </div>
    );
};

export default Messenger;