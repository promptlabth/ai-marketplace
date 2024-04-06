import React from 'react'
import { useRouter } from 'next/router';
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineAddBox } from "react-icons/md";

const Sidebar: React.FC = () => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    const isActive = (route: string) => {
        return router.pathname === route ? 'bg-gray-800 shadow-lg' : 'bg-gray-700';
    }

    return (
        <div className="fixed z-50 flex flex-col justify-between gap-6 md:visible invisible top-4 m-4 h-[94%] w-fit bg-gray-700 shadow-lg shadow-gray-900/50 p-2 rounded-xl">
            <div className='flex flex-col gap-6'>
                <button onClick={() => navigateTo('/')} className={`flex justify-center flex-col items-center text-white focus:bg-gray-800 hover:scale-105 ${isActive('/')} hover:bg-gray-800  rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                    <RiHome2Line color='white' size={40} />
                    หน้าหลัก
                </button>
                <button onClick={() => navigateTo('/creator/create_agent')} className={`flex justify-center flex-col items-center text-white focus:bg-gray-800 hover:scale-105 ${isActive('/creator/create_agent')} hover:bg-gray-800  rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                    <MdOutlineAddBox color='white' size={40} />
                    สร้าง AI
                </button>
                <button onClick={() => navigateTo('/customer/used_agent')} className={`flex justify-center flex-col items-center text-white focus:bg-gray-800 hover:scale-105 ${isActive('/customer/used_agent')} hover:bg-gray-800  rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                    <MdOutlineFormatListBulleted color='white' size={40} />
                    ลิสต์  AI
                </button>
                <button onClick={() => navigateTo('/customer/marketplace')} className={`flex justify-center flex-col items-center text-white focus:bg-gray-800 hover:scale-105 ${isActive('/customer/marketplace')} hover:bg-gray-800  rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                    <BsCart2 color='white' size={40} />
                    ร้านค้า AI
                </button>
            </div>
            {/* เผื่อมีโปรไฟล์ */}
            {/* <div>
                <button onClick={() => navigateTo('')} className={`focus:bg-gray-800 hover:scale-105 ${isActive('')} hover:bg-gray-800  rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                    <CgProfile color='white' size={40} />
                </button>
            </div> */}
        </div>
    )
}

export default Sidebar
