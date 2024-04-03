import React from 'react'
import { useRouter } from 'next/router';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Sidebar: React.FC = () => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    const isActive = (route: string) => {
        return router.pathname === route ? 'bg-gray-800 shadow-lg shadow-green-600/50' : 'bg-gray-700';
    }

    return (
        <div className="fixed z-50 flex flex-col justify-between gap-6 md:visible invisible top-4 m-4 h-[94%] w-fit bg-gray-700 shadow-lg shadow-gray-900/50 p-4 rounded-xl">
            <div className='flex flex-col gap-6'>
                <button onClick={() => navigateTo('/creator/create_agent')} className={`focus:bg-gray-800 hover:scale-105 ${isActive('/creator/create_agent')} hover:bg-gray-800  rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                    <IoIosAddCircleOutline color='white' size={40} />
                </button>
                <button onClick={() => navigateTo('/customer/use_agent')} className={`focus:bg-gray-800 hover:scale-105 ${isActive('/customer/use_agent')} hover:bg-gray-800  rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                    <MdOutlineFormatListBulleted color='white' size={40} />
                </button>
                <button onClick={() => navigateTo('/customer/marketplace')} className={`focus:bg-gray-800 hover:scale-105 ${isActive('/customer/marketplace')} hover:bg-gray-800  rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                    <MdAddShoppingCart color='white' size={40} />
                </button>
            </div>
            <div>
                <button onClick={() => navigateTo('/')} className={`focus:bg-gray-800 hover:scale-105 ${isActive('/')} hover:bg-gray-800  rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                    <CgProfile color='white' size={40} />
                </button>
            </div>
        </div>
    )
}

export default Sidebar
