import React from 'react';
import { useRouter } from 'next/navigation';

interface ButtonProps {
    name_button: string;
    route_page: string;
    className?: string;
}

const ButtonNext: React.FC<ButtonProps> = ({ name_button, route_page }) => {

    const router = useRouter();
    const GotoEditAgent = () => {
        router.push(`${route_page}`)
    }

    return (
        <button onClick={GotoEditAgent} className="flex-auto hover:bg-[#03FFAB] hover:text-white focus:bg-[#03FFAB] sm:text-[17px] sm:font-bold focus:text-black h-[40px] w-full ring-2 ring-[#03FFAB] ring-inset rounded-full text-[12px] text-[#03FFAB]">{name_button}</button>
    );
}

export default ButtonNext;
