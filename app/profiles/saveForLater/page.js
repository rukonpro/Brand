import React from 'react';
import fakeData from "@/app/FakeData/FakeData";
import Image from "next/image";
import SavedForLaterItems from "@/app/components/SavedForLaterItems/SavedForLaterItems";

const SaveForLater = () => {
    return (
        <div>
           <SavedForLaterItems/>

        </div>
    );
};

export default SaveForLater;