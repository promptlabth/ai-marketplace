import React from 'react';
import Image from "next/image";

interface InputNameProps {
    name_label: string;
    placeholder: string; 
}

const SearchInputFloat: React.FC<InputNameProps> = ({ name_label, placeholder }) => {
    return (
        <div className="flex flex-col w-64 absolute top-5 left-5 sm:visible invisible">
            <label htmlFor="aiName" className="text-white">
                {name_label}
            </label>
            <div className="relative mt-2 flex items-center w-full">
                <input
                    type="text"
                    id="aiName"
                    name="aiName"
                    placeholder={placeholder}
                    aria-label="Enter AI name here"
                    className="h-[40px] w-full rounded pl-10 pr-2 bg-[#3D434A] ring-1 ring-[#6E6F70] focus:ring-white text-white"
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Image src="/png/search.png" height={20} width={20} alt="Search" />
                </div>
            </div>
        </div>
    );
}

export default SearchInputFloat;
