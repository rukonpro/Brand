import React from 'react';
import MyProfileForm from "@/app/components/MyProfileForm/MyProfileForm";

export const metadata = {
    title: "My Profile - Brand",
    description: "Manage your account details on Brand. View your order history, update personal information, and adjust your settings for a personalized shopping experience.",
    keywords: "my profile, account details, order history, update information, Brand",
    openGraph: {
        title: "My Profile - Brand",
        description: "Manage your account details on Brand. View your order history, update personal information, and adjust your settings for a personalized shopping experience.",
        url: "https://brand-rukon.vercel.app/myAccount", // Adjust the URL if necessary
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "My Profile - Brand",
        description: "Manage your account details on Brand. View your order history, update personal information, and adjust your settings for a personalized shopping experience.",
    },
};


const MyAccount = () => {
    return (
        <>
            <MyProfileForm/>
        </>
    );
};

export default MyAccount;