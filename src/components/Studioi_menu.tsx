import React, { useState } from 'react';
import { RiMenu4Fill } from "react-icons/ri";
import Link from 'next/link';

const StudioMenu = () => {
    const [open, setOpen] = useState<string>("invisible");

    const Menu: React.FC<{ isOpen: string }> = ({ isOpen }) => {
        return (
            <div className={`fixed p-3 right-0 top-0 w-[250px] h-full z-50 bg-gray-700 ${isOpen}`}>
                <button onClick={toggleMenu} className=' font-bold text-xl flex w-full text-white justify-end px-4 py-2'>x</button>
                <div className='flex w-full h-full border-2'>
                    <Link href="">1</Link>
                </div>
            </div>
        );
    }

    const toggleMenu = () => {
        const newState = open === "invisible" ? "visible" : "invisible";
        setOpen(newState);
    }

    return (
        <div className="fixed top-5 right-8">
            <Menu isOpen={open} />
            <button onClick={toggleMenu} className='flex focus:scale-95 hover:scale-95'>
                <RiMenu4Fill size={30} color='#03FFAB' />
            </button>
        </div>
    );
}

export default StudioMenu;
