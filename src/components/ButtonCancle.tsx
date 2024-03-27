import React from 'react';
import { useRouter } from 'next/navigation';


interface ButtonProps {
    name_button: string;
}

const ButtonCancle: React.FC<ButtonProps> = ({ name_button }) => {

    const router = useRouter();
    const GotoCreateAgent = () => {
        router.push("/creator/create_agent")
    }

    return (
        <button onClick={GotoCreateAgent} className="sm:flex-auto hover:bg-[#697179] hover:text-white focus:bg-[#697179] focus:text-white h-[40px] w-full ring-2 ring-[#697179] ring-inset rounded-full text-[12px] sm:text-[17px] sm:font-bold text-[#697179]">{name_button}</button>
    );
}

export default ButtonCancle;
