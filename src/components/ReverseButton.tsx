import React from 'react'
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

const Reverse_button: React.FC<{ route_path: string }> = ({ route_path }) => {
    return (
        <div className="absolute sm:invisible top-5 left-5 m-4">
            <Link className='flex' href={route_path}>
                <FaArrowLeft color='white' size={30}/>
            </Link>
        </div>
    )
}

export default Reverse_button
