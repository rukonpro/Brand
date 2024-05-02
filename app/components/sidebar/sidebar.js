
import Link from 'next/link';
import {profileMenu} from "@/app/components/navbar/profileDrawer";
import Image from "next/image";

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <div
            className={`  h-full inset-y-0 left-0  bg-white text-gray-600 transition-transform duration-300 ease-in-out transform rounded-lg overflow-hidden`}
        >
            <div className="flex justify-between items-center p-4 ">
                <div className="text-2xl font-bold text-gray-700 ">Profiles</div>
                <button className="text-white" onClick={onClose}>
                    Close
                </button>
            </div>
            <ul className="p-4">
                {
                    profileMenu.map((menu,index)=>{
                        return (
                            <li
                                key={index}
                                className="mb-2">
                                <Link href={menu.path}>
                                    <button className="flex items-center gap-2">
                                        <Image height={20} width={20} src={menu.icon} alt={menu.title}/>
                                        <p className="hover:text-blue-500 hidden md:block">{menu.title}</p>
                                    </button>
                                </Link>
                            </li>
                        )
                    })
                }


            </ul>
        </div>
    );
};

export default Sidebar;