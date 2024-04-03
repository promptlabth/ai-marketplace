import React from 'react';
import { useRouter } from 'next/router';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

const FooterButton: React.FC = () => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    const isActive = (route: string) => {
        return router.pathname === route ? 'bg-gray-800 shadow-lg shadow-green-600/50' : 'bg-gray-700';
    }

    return (
        <footer className="fixed md:invisible bottom-0 inset-x-0 bg-gray-700 shadow-lg shadow-gray-900/50 w-full rounded-t-xl h-[70px] flex justify-evenly items-center">
            <button onClick={() => navigateTo('/customer/marketplace')} className={`focus:outline-none hover:scale-105 ${isActive('/customer/marketplace')} rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                <MdAddShoppingCart color='white' size={40} />
            </button>
            <button onClick={() => navigateTo('/creator/create_agent')} className={`focus:outline-none hover:scale-105 ${isActive('/creator/create_agent')} rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                <IoIosAddCircleOutline color='white' size={40} />
            </button>
            <button onClick={() => navigateTo('/customer/used_agent')} className={`focus:outline-none hover:scale-105 ${isActive('/customer/used_agent')} rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                <MdOutlineFormatListBulleted color='white' size={40} />
            </button>
        </footer>
    );
};

export default FooterButton;
