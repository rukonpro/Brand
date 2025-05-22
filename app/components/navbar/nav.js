import React from 'react';
import Image from 'next/image';
import MenuIcon from "@/public/images/menu.png";
import Link from 'next/link';

const Nav = () => {
    return (
        <div className=" border-y-2 py-4 bg-white dark:bg-slate-800 dark:text-stone-100 dark:border-slate-700 px-3 hidden md:block">
            <div className="max-w-[1200px] mx-auto ">
                <div >
                    <div className=" flex justify-between">
                        <div className="flex gap-3 font-bold">
                            {/*<button>*/}
                            {/*    <Image src={MenuIcon} alt='MenuIcon'/>*/}
                            {/*</button>*/}
                            <Link href="/allCategory">All category</Link>
                            <Link href="/hotOffer">Hot offers</Link>
                            <Link href="/">Gift boxes</Link>
                            <Link href="/">Help</Link>

                        </div>
                        <div className="flex gap-3 font-bold">
                            <Link href="/">English,USD</Link>
                            <Link href="/">Ship to</Link>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Nav;