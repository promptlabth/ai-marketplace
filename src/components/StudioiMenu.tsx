import React, { useState } from 'react';
import { RiMenu4Fill } from "react-icons/ri";
import { useRouter } from 'next/router';


const StudioMenu = () => {
    const [open, setOpen] = useState<string>("invisible");

    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    const isActive = (route: string) => {
        return router.pathname === route ? 'bg-gray-800 rounded-xl border' : 'bg-gray-700';
    }

    const Menu: React.FC<{ isOpen: string }> = ({ isOpen }) => {
        return (
            <div className={`fixed p-3 right-0 top-0 w-[250px] h-full z-50 bg-gray-700 ${isOpen}`}>
                <button onClick={toggleMenu} className=' font-bold text-xl flex w-full text-white justify-end px-4 py-2'>x</button>
                <div className='flex flex-col gap-2 w-full h-full'>
                    <button onClick={() => navigateTo('/creator/profile')} className={`flex justify-start w-full text-gray-200 p-2 hover:rounded-xl hover:border focus:rounded-xl focus:border ${isActive("/creator/profile")}`}>โปรไฟล์</button>
                    <button onClick={() => navigateTo('/creator/create_agent')} className={`flex justify-start w-full text-gray-200 p-2 hover:rounded-xl hover:border focus:rounded-xl focus:border ${isActive("/creator/create_agent")}`}>สร้าง AI</button>
                    <button onClick={() => navigateTo('/creator/dashboard_overall')} className={`flex justify-start w-full text-gray-200 p-2 hover:rounded-xl hover:border focus:rounded-xl focus:border ${isActive("/creator/dashboard_overall")}`}>ภาพรวมรายงาน AI</button>
                    <button onClick={() => navigateTo('/creator/list_agent')} className={`flex justify-start w-full text-gray-200 p-2 hover:rounded-xl hover:border focus:rounded-xl focus:border ${isActive("/creator/list_agent")}`}>ลิสต์ AI</button>
                    <button onClick={() => navigateTo('/creator/payments')} className={`flex justify-start w-full text-gray-200 p-2 hover:rounded-xl hover:border focus:rounded-xl focus:border ${isActive("/creator/payments")}`}>การชำระเงิน</button>
                </div>
            </div>
        );
    }

    const toggleMenu = () => {
        const newState = open === "invisible" ? "visible" : "invisible";
        setOpen(newState);
    }

    return (
        <div>
            <Menu isOpen={open} />
            <button onClick={toggleMenu} className='flex focus:scale-95 hover:scale-95'>
                <RiMenu4Fill size={30} color='#03FFAB' />
            </button>
        </div>
    );
}

export default StudioMenu;
