import React from 'react'
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";


const Sidebar = () => {
    return (
        <div className="fixed z-50 flex flex-col gap-6 md:visible invisible top-4 m-4 h-[90%] w-fit bg-gray-700 shadow-lg shadow-gray-900/50 p-4 rounded-xl">
            <button className='focus:bg-gray-800 hover:scale-105 hover:bg-gray-800 bg-gray-600 rounded-lg p-1 shadow-lg shadow-[#03FFAB]/30'>
                <IoIosAddCircleOutline color='white' size={40} />
            </button>
            <button className='focus:bg-gray-800 hover:scale-105 hover:bg-gray-800 bg-gray-600 rounded-lg p-1 shadow-lg shadow-[#03FFAB]/30'>
                <MdOutlineFormatListBulleted color='white' size={40} />
            </button>
            <button className='focus:bg-gray-800 hover:scale-105 hover:bg-gray-800 bg-gray-600 rounded-lg p-1 shadow-lg shadow-[#03FFAB]/30'>
                <MdAddShoppingCart color='white' size={40} />
            </button>
        </div>
    )
}

export default Sidebar
