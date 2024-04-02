import React from 'react';
import { Carousel } from '@material-tailwind/react';

const CarouselTransition: React.FC = () => {
    const carouselProps: any = {
        transition: { duration: 1.5 },
        className: "rounded-xl py-2 sm:w-[600px]",
        autoplay: true,
        autoplayDelay: 3000,
        loop: true,
    };

    return (
        <Carousel {...carouselProps}>
            <h1 className='flex items-center justify-center h-full text-white text-[25px] '>ตั้งชื่อ AI ของคุณ</h1>
            <h1 className='flex items-center justify-center h-full text-white text-[25px] '>เลือก Framework AI ของคุณ</h1>
            <button className='flex items-center justify-center h-full w-full underline text-xl text-white hover:scale-105 focus:scale-105 '>เริ่มสร้างเลย !</button>
        </Carousel>
    );
};

export default CarouselTransition;
