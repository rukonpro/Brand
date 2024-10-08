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
import SubscribeOnOurNewsletter from "@/app/components/SubscribeOnOurNewsletter/SubscribeOnOurNewsletter";

const Footer = () => {

    const FooterData = {
        logo: Logo,
        description: "Best information about the company gies here but now lorem ipsum",
        social: [FacebookIcon, instagramIcon, linkedinIcon, twitterIcon, youtubeIcon],
        footerCategory: [
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
                        path: "/login"

                    },
                    {
                        title: "Register",
                        path: "/register"

                    },
                    {
                        title: "Settings",
                        path: "/settings"

                    },
                    {
                        title: "My Orders",
                        path: "/myOrders"

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
                        link: "/"

                    },
                    {
                        href: "/",
                        icon: googleStoreIcon,
                        title: "Google Store",
                        link: "/"

                    },

                ]
            },
        ]
    }
    return (
        <footer>
            <div className='bg-white dark:bg-slate-700'>
                <SubscribeOnOurNewsletter/>
                <div className='grid grid-cols-12 gap-5 max-w-[1200px] mx-auto px-3 py-10'>
                    <div className='md:col-span-3 col-span-12'>
                        <Image src={FooterData?.logo} alt='Brand logo' />
                        <p className='pt-5'>{FooterData?.description}</p>

                        <ul className='flex gap-3 pt-5'>
                            {
                                FooterData?.social?.map((data, index) => {
                                    return (
                                        <li key={index}>
                                            <a href='/' >
                                                <Image src={data} alt={data} />
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                    <ul className="md:col-span-9 col-span-12 grid sm:grid-cols-5 grid-cols-3 ">
                        {
                            FooterData?.footerCategory?.map((category, index) => {
                                return (
                                    <li key={index}>
                                        <h1 className='font-bold sm:pt-0 pt-10'>{category?.title}</h1>

                                        <ul className='pt-5 '>
                                            {
                                                category?.links?.map((link, index) => {
                                                    return (
                                                        <li key={index} className='mt-2 text-gray-500 dark:text-slate-300'>
                                                            {
                                                                link?.path ?
                                                                    <Link href={link?.path}>{link?.title+index}</Link> :

                                                                    <a href={link?.link} >
                                                                        <Image src={link.icon} alt={link?.title+index}/>
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

            <div className='bg-gray-200 py-10 dark:bg-slate-800'>
                <div className='max-w-[1200px] mx-auto'>
                    <h1 className='text-center'>© {new Date().getFullYear()} Ecommerce. </h1>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
