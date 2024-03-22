import React from 'react';

interface ButtonProps {
    name_button: string;
}
// #03FFAB
const ButtonCancle: React.FC<ButtonProps> = ({ name_button }) => {
    return (
        <button className="sm:flex-auto hover:bg-[#697179] focus:bg-[#697179] focus:text-white h-[40px] w-full ring-2 ring-[#697179] ring-inset rounded-full text-[12px] text-[#697179]">{name_button}</button>
    );
}

export default ButtonCancle;
