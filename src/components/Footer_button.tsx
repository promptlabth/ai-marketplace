import React from 'react';
import Image from "next/image";

interface ButtonProps {
    name_button: string;
}

const FooterButton: React.FC = () => {

    const Button: React.FC<ButtonProps> = ({ name_button }) => {
        return (
            <button className="w-[50px] h-[50px] rounded-xl focus:bg-emerald-600 hover:bg-emerald-600 flex justify-center items-center">
                <Image src={`${name_button}`} alt="" height={35} width={35} />
            </button>
        );
    };

    return (
        <footer className="fixed sm:invisible bottom-0 inset-x-0 bg-emerald-500 w-full rounded-t-xl h-[70px] flex justify-evenly items-center">
            <Button name_button="/png/add.png" />
            <Button name_button="/png/list_black.png" />
            <Button name_button="/shopping-cart.svg" />
            <Button name_button="/apps.svg" />
        </footer>
    );
};

export default FooterButton;
