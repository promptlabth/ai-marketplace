import React, { useState, useEffect } from 'react';
import { Carousel } from '@material-tailwind/react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const CarouselMarketplace: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const carouselProps: any = {
        transition: { duration: 1.5 },
        className: "rounded-xl py-2 sm:w-[600px] z-[10]", // Ensure lower z-index for carousel
        autoplay: true,
        autoplayDelay: 4500,
        loop: true,
        indicators: false, // Ensure indicators are disabled
        showDots: false, // Ensure dots are disabled
    };
    
    const { t } = useTranslation('common');

    const images = isMobile 
        ? [
            "/png/carousel/mobile/1.png",
            "/png/carousel/mobile/2.png",
            "/png/carousel/mobile/3.png",
            "/png/carousel/mobile/4.png",
            "/png/carousel/mobile/5.png"
          ]
        : [
            "/png/carousel/2.png",
            "/png/carousel/3.png",
            "/png/carousel/6.png",
            "/png/carousel/5.png",
            "/png/carousel/4.png"
          ];

    return (
        <Carousel {...carouselProps}>
            {images.map((src, index) => (
                <div key={index} className='w-full h-full flex justify-center items-center carousel-item'>
                    <Image 
                        src={src} 
                        alt='' 
                        width={isMobile ? 600 : 1875} 
                        height={isMobile ? 284 : 888} 
                        onClick={() => {
                            const carousel = document.querySelector('.carousel');
                            if (carousel) {
                                const items = carousel.querySelectorAll('.carousel-item');
                                if (items[index]) {
                                    items[index].scrollIntoView({ behavior: 'smooth' });
                                }
                            }
                        }}
                    />
                </div>
            ))}
            {/* <div className='flex flex-col justify-center items-center h-full w-full'>
                <button className='flex items-center justify-center h-full w-full underline text-xl text-white hover:scale-105 focus:scale-105'>
                    {t('components.carouselmarketplace.try')}
                </button>
            </div> */}
        </Carousel>
    );
};

export default CarouselMarketplace;