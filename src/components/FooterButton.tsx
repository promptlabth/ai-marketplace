import React from 'react';
import { useRouter } from 'next/router';
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { RiHome2Line } from "react-icons/ri";
import { MdOutlineAddBox } from "react-icons/md";
import { useTranslation } from 'next-i18next'


const FooterButton: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation('common')

    const navigateTo = (path: string) => {
        router.push(path);
    };

    const isActive = (route: string) => {
        return router.pathname === route ? 'bg-gray-800 shadow-lg' : 'bg-gray-700';
    }

    return (
        <footer className="fixed md:invisible bottom-0 inset-x-0 bg-gray-700 shadow-lg shadow-gray-900/50 w-full h-[70px] flex justify-evenly items-center z-3">
            <button onClick={() => navigateTo('/')} className={`flex text-[13px] justify-center flex-col items-center text-white focus:outline-none hover:scale-105 ${isActive('/')} rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                <RiHome2Line color='white' size={30} />
                {t('components.sidebar.home')}
            </button>
            <button onClick={() => navigateTo('/customer/marketplace')} className={`flex text-[13px] justify-center flex-col items-center text-white focus:outline-none hover:scale-105 ${isActive('/customer/marketplace')} rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                <BsCart2 color='white' size={30} />
                {t('components.sidebar.market_ai')}
            </button>
            <button onClick={() => navigateTo('/creator/create_agent')} className={`flex text-[13px] justify-center flex-col items-center text-white focus:outline-none hover:scale-105 ${isActive('/creator/create_agent')} rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                <MdOutlineAddBox color='white' size={30} />
                {t('components.sidebar.create_ai')}
            </button>
            <button onClick={() => navigateTo('/customer/used_agent')} className={`flex text-[13px] justify-center flex-col items-center text-white focus:outline-none hover:scale-105 ${isActive('/customer/used_agent')} rounded-lg p-1 shadow-lg shadow-gray-600/30`}>
                <MdOutlineFormatListBulleted color='white' size={30} />
                {t('components.sidebar.list_ai')}
            </button>
        </footer>
    );
};

export default FooterButton;
