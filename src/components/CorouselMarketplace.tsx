import React from 'react';
import { Carousel } from '@material-tailwind/react';
import Image from 'next/image';
import { MdScience } from "react-icons/md";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const CarouselMarketplace: React.FC = () => {
    const carouselProps: any = {
        transition: { duration: 1.5 },
        className: "rounded-xl py-2 sm:w-[600px]",
        autoplay: true,
        autoplayDelay: 3000,
        loop: true,
    };
    const { t } = useTranslation('common')

    return (
        <Carousel {...carouselProps}>
            <div className='w-full h-full flex justify-center items-center'>
                <h1 className='flex items-center justify-center h-full text-[25px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-orange-500'>{t('components.carouselmarketplace.lawyer')}</h1>
                <Image src="/png/hammer.png" alt='' width={40} height={40}></Image>
            </div>
            <div className='w-full h-full flex justify-center items-center'>
                <h1 className='flex items-center justify-center h-full text-[25px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500'>{t('components.carouselmarketplace.scientist')}</h1>
                <MdScience color='white' size={40} />
            </div>
            <div className='flex flex-col justify-center items-center h-full w-full'>
                    <button className='flex items-center justify-center h-full w-full underline text-xl text-white hover:scale-105 focus:scale-105'>{t('components.carouselmarketplace.try')}</button>
            </div>
        </Carousel>
    );
};

export default CarouselMarketplace;
