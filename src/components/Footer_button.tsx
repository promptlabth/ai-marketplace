import React from 'react';
import { useRouter } from 'next/navigation';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

interface ButtonProps {
    icon_button: string;
    router_page: string;
}

const FooterButton: React.FC = () => {
    const router = useRouter();

    return (
        <footer className="relative sm:invisible bottom-0 inset-x-0 bg-gray-700 shadow-lg shadow-gray-900/50 w-full rounded-t-xl h-[70px] flex justify-evenly items-center">
            <button className='focus:bg-gray-800 hover:scale-105 hover:bg-gray-800 bg-gray-600 rounded-lg p-1 shadow-lg shadow-[#03FFAB]/30'>
                <IoIosAddCircleOutline color='white' size={40} />
            </button>
            <button className='focus:bg-gray-800 hover:scale-105 hover:bg-gray-800 bg-gray-600 rounded-lg p-1 shadow-lg shadow-[#03FFAB]/30'>
                <MdOutlineFormatListBulleted color='white' size={40} />
            </button>
            <button className='focus:bg-gray-800 hover:scale-105 hover:bg-gray-800 bg-gray-600 rounded-lg p-1 shadow-lg shadow-[#03FFAB]/30'>
                <MdAddShoppingCart color='white' size={40} />
            </button>
        </footer>
    );
};

export default FooterButton;
