import React from 'react';
import { useRouter } from 'next/router';
import { MdOutlineFormatListBulleted, MdOutlineAddBox } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { RiHome2Line } from "react-icons/ri";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from 'next-i18next';

const Sidebar: React.FC = () => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    const isActive = (route: string) => {
        return router.pathname === route ? 'bg-gray-800 shadow-lg shadow-[#02ffac]' : 'bg-gray-700';
    }
    const { t } = useTranslation('common');

    return (
        <div className="fixed z-10 flex flex-col justify-between gap-6 md:visible invisible top-4 left-4 h-fit w-fit bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg shadow-gray-900/50 p-4 rounded-xl animate-fade-right mt-6">
            <div className='flex flex-col gap-6'>
                <button onClick={() => navigateTo('/')} className={`flex justify-center items-center text-white focus:bg-gray-800 hover:scale-105 ${isActive('/')} hover:bg-gray-800 rounded-lg p-2 shadow-lg shadow-gray-600/30 transition-all duration-200`}>
                    <RiHome2Line color='white' size={30} />
                    <span className="ml-2">{t('components.sidebar.home')}</span>
                </button>
                <button onClick={() => navigateTo('/creator/create_agent')} className={`flex justify-center items-center text-white focus:bg-gray-800 hover:scale-105 ${isActive('/creator/create_agent')} hover:bg-gray-800 rounded-lg p-2 shadow-lg shadow-gray-600/30 transition-all duration-200`}>
                    <MdOutlineAddBox color='white' size={30} />
                    <span className="ml-2">{t('components.sidebar.create_ai')}</span>
                </button>
                <button onClick={() => navigateTo('/customer/used_agent')} className={`flex justify-center items-center text-white focus:bg-gray-800 hover:scale-105 ${isActive('/customer/used_agent')} hover:bg-gray-800 rounded-lg p-2 shadow-lg shadow-gray-600/30 transition-all duration-200`}>
                    <MdOutlineFormatListBulleted color='white' size={30} />
                    <span className="ml-2">{t('components.sidebar.list_ai')}</span>
                </button>
                <button onClick={() => navigateTo('/customer/marketplace')} className={`flex justify-center items-center text-white focus:bg-gray-800 hover:scale-105 ${isActive('/customer/marketplace')} hover:bg-gray-800 rounded-lg p-2 shadow-lg shadow-gray-600/30 transition-all duration-200`}>
                    <BsCart2 color='white' size={30} />
                    <span className="ml-2">{t('components.sidebar.market_ai')}</span>
                </button>
                <button onClick={() => window.open('https://promptlabai.com/th/', '_blank')} className="flex justify-center items-center text-white focus:bg-gray-800 hover:scale-105 bg-gray-700 hover:bg-gray-800 rounded-lg p-2 shadow-lg shadow-gray-600/30 transition-all duration-200">
                    <FaExternalLinkAlt color='white' size={30} />
                    <span className="ml-2">{t('components.sidebar.external_link')}</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
