import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from "@/public/images/logo-colored.png";
import FacebookIcon from "@/public/images/FacebookIcon.png";
import instagramIcon from "@/public/images/instagramIcon.png";
import linkedinIcon from "@/public/images/linkedinIcon.png";
import twitterIcon from "@/public/images/twitterIcon.png";
import youtubeIcon from "@/public/images/youtubeIcon.png";
import googleStoreIcon from "@/public/images/googleStoreIcon.png";
import appleStoreIcon from "@/public/images/appleStoreIcon.png";

const Footer = () => {

    const FooterData = {
        logo: Logo,
        description: "Best information about the company gies here but now lorem ipsum",
        socile: [FacebookIcon, instagramIcon, linkedinIcon, twitterIcon, youtubeIcon],
        footerCetagory: [
            {
                title: "About",
                links: [
                    {
                        title: "About Us",
                        path: "/"

                    },
                    {
                        title: "Find store",
                        path: "/"

                    },
                    {
                        title: "Categories",
                        path: "/"

                    },
                    {
                        title: "Blogs",
                        path: "/"

                    },
                ]
            },
            {
                title: "Partnership",
                links: [
                    {
                        title: "About Us",
                        path: "/"

                    },
                    {
                        title: "Find store",
                        path: "/"

                    },
                    {
                        title: "Categories",
                        path: "/"

                    },
                    {
                        title: "Blogs",
                        path: "/"

                    },
                ]
            },
            {
                title: "Information",
                links: [
                    {
                        title: "Help Center",
                        path: "/"

                    },
                    {
                        title: "Money Refund",
                        path: "/"

                    },
                    {
                        title: "Shipping",
                        path: "/"

                    },
                    {
                        title: "Contact us",
                        path: "/"

                    },
                ]
            },
            {
                title: "For users",
                links: [
                    {
                        title: "Login",
                        path: "/"

                    },
                    {
                        title: "Register",
                        path: "/"

                    },
                    {
                        title: "Settings",
                        path: "/"

                    },
                    {
                        title: "My Orders",
                        path: "/"

                    },
                ]
            },
            {
                title: "Get app",
                links: [
                    {
                        href: "/",
                        icon: appleStoreIcon,
                        title: "Apple Store",
                        link: "/sdfsdf"

                    },
                    {
                        href: "/",
                        icon: googleStoreIcon,
                        title: "Google Stor",
                        link: "/sdfsd"

                    },

                ]
            },

        ]
    }
    return (
        <div>
            <div className='max-w-[1200px] mx-auto py-10'>

                <div className='grid grid-cols-12 gap-5'>
                    <div className='col-span-3'>
                        <Image src={FooterData?.logo} alt='' />
                        <p className='pt-5'>{FooterData?.description}</p>

                        <ul className='flex gap-3 pt-5'>
                            {
                                FooterData?.socile.map((data, index) => {
                                    return (
                                        <li key={index}>
                                            <a href='/' >
                                                <Image src={data} alt='' />
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <ul className="col-span-9 grid grid-cols-5">
                        {
                            FooterData?.footerCetagory?.map((cetagory,index) => {
                                return (
                                    <li key={index}>
                                        <h1 className='font-bold'>{cetagory?.title}</h1>

                                        <ul className='pt-5 '>
                                            {
                                                cetagory?.links?.map((link, index) => {
                                                    return (
                                                        <li key={index} className='mt-2 text-gray-500'>
                                                            {
                                                                link?.path ?
                                                                    <Link href={link?.path}>{link?.title}</Link> :

                                                                    <a href={link?.link} >
                                                                        <Image src={link.icon} alt=''/>
                                                                    </a>
                                                            }
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className='bg-gray-200 py-10'>
                <div className='max-w-[1200px] mx-auto'>
                    <h1 className='text-center'>© {new Date().getFullYear()} Ecommerce. </h1>

                </div>
            </div>
        </div>
    );
};

export default Footer;