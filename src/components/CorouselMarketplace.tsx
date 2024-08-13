import React from 'react';
import { Carousel } from '@material-tailwind/react';
import Image from 'next/image';
import { MdScience } from "react-icons/md";
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
                <Image src="/png/carousel/2.png" alt='' width={1875} height={888}></Image>
            </div>
            <div className='w-full h-full flex justify-center items-center'>
                <Image src="/png/carousel/3.png" alt='' width={1875} height={888}></Image>
            </div>
            <div className='w-full h-full flex justify-center items-center'>
                <Image src="/png/carousel/6.png" alt='' width={1875} height={888}></Image>
            </div>
            <div className='w-full h-full flex justify-center items-center'>
                <Image src="/png/carousel/5.png" alt='' width={1875} height={888}></Image>
            </div>
            <div className='w-full h-full flex justify-center items-center'>
                <Image src="/png/carousel/4.png" alt='' width={1875} height={888}></Image>
            </div>
            <div className='flex flex-col justify-center items-center h-full w-full'>
                <button className='flex items-center justify-center h-full w-full underline text-xl text-white hover:scale-105 focus:scale-105'>{t('components.carouselmarketplace.try')}</button>
            </div>
        </Carousel>
    );
};

export default CarouselMarketplace;

