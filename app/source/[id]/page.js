import React from 'react';
import Navbar from "@/app/components/navbar/navbar";
import Nav from "@/app/components/navbar/nav";
import Footer from "@/app/components/Footer/Footer";

const Page = ({params}) => {
    return (
        <div>
            <Navbar/>
            <Nav/>
            <h1>source {params.id}</h1>
            <Footer/>
        </div>
    );
};

export default Page;