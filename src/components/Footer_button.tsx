import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface ButtonProps {
    icon_button: string;
    router_page: string;
}

const FooterButton: React.FC = () => {
    const router = useRouter();
    const Button: React.FC<ButtonProps> = ({ icon_button, router_page }) => {
        return (
            <button onClick={() => { router.push(`${router_page}`) }} className="w-[50px] h-[50px] rounded-xl focus:bg-emerald-600 hover:bg-emerald-600 flex justify-center items-center">
                <Image src={`${icon_button}`} alt="" height={35} width={35} />
            </button>
        );
    };

    return (
        <footer className="fixed sm:invisible bottom-0 inset-x-0 bg-emerald-500 w-full rounded-t-xl h-[70px] flex justify-evenly items-center">
            <Button icon_button="/png/add.png" router_page='/creator/create_agent' />
            <Button icon_button="/png/list_black.png" router_page='/creator/list_agent' />
            <Button icon_button="/shopping-cart.svg" router_page='/customer/marketplace' />
            <Button icon_button="/apps.svg" router_page='/creator/create_agent' />
        </footer>
    );
};

export default FooterButton;
