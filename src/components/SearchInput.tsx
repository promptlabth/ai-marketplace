import React from 'react';
import Image from "next/image";

interface InputNameProps {
    name_label: string;
    placeholder: string; 
    invisible: string;
}

const SearchInput: React.FC<InputNameProps> = ({ name_label, placeholder, invisible }) => {
    return (
        <div className={`flex flex-col w-full ${invisible}`}>
            <label htmlFor="aiName" className="text-white">
                {name_label}
            </label>
            <input
                type="text"
                id="aiName"
                name="aiName"
                placeholder={placeholder}
                aria-label="Enter AI name here"
                className="bg-[url('/png/search.png')] bg-no-repeat bg-center-left pl-10 pr-2 h-[40px] w-full rounded bg-[#3D434A] text-white ring-1 ring-[#6E6F70] focus:ring-white"
                style={{ backgroundPositionX: '10px',backgroundPositionY: '10px', backgroundSize: '20px 20px' }}
            />
        </div>
    );
}


export default SearchInput;
