import React from 'react';
import Image from 'next/image';
import MenuIcon from "@/public/images/menu.png"
import Link from 'next/link';

const Nav = () => {
    return (
        <div className=" border-y-2 py-4 bg-white px-3">
            <div className="max-w-[1200px] mx-auto ">
                <div className="flex justify-between">
                    <div className="flex gap-3 font-bold">
                        <button>
                            <Image src={MenuIcon} alt=''/>
                        </button>
                        <Link href="/">All Cetagory</Link>
                        <Link href="/">Hot offers</Link>
                        <Link href="/">Gift boxes</Link>
                        <Link href="/">Projects</Link>
                        <Link href="/">Menu item</Link>
                        <Link href="/">Help</Link>

                    </div>
                    <div className="flex gap-3 font-bold">
                        <Link href="/">English,USD</Link>
                        <Link href="/">Ship to</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;