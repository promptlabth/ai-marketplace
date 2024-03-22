import React from 'react';

interface ButtonProps {
    name_button: string;
}
// #03FFAB
const ButtonNext: React.FC<ButtonProps> = ({ name_button }) => {
    return (
        <button className="flex-auto hover:bg-[#03FFAB] focus:bg-[#03FFAB] focus:text-black h-[40px] w-full ring-2 ring-[#03FFAB] ring-inset rounded-full text-[12px] text-[#03FFAB]">{name_button}</button>
    );
}

export default ButtonNext;
