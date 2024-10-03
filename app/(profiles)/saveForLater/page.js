import React from 'react';
import fakeData from "@/app/FakeData/FakeData";
import Image from "next/image";
import SavedForLaterItems from "@/app/components/SavedForLaterItems/SavedForLaterItems";


export const metadata = {
    title: "Save For Later - Brand",
    description: "Keep your favorite products on hold with the Save For Later feature on Brand. Easily access and manage items you wish to purchase later.",
    keywords: "save for later, favorite products, wishlist, online shopping, Brand",
    openGraph: {
        title: "Save For Later - Brand",
        description: "Keep your favorite products on hold with the Save For Later feature on Brand. Easily access and manage items you wish to purchase later.",
        url: "https://brand-rukon.vercel.app/saveForLater", // Adjust the URL if necessary
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Save For Later - Brand",
        description: "Keep your favorite products on hold with the Save For Later feature on Brand. Easily access and manage items you wish to purchase later.",
    },
};


const SaveForLater = () => {
    return (
        <div>
           <SavedForLaterItems/>

        </div>
    );
};

export default SaveForLater;