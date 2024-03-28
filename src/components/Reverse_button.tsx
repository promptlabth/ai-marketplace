import React from 'react'
import Link from "next/link";
import Image from 'next/image';

const Reverse_button: React.FC<{ route_path: string }> = ({ route_path }) => {
    return (
        <div className="absolute top-5 left-5 m-4">
            <Link className='flex' href={route_path}>
                <Image className='sm:invisible hover:scale-105' alt='' src='/png/arrow-left.png' height={15} width={35} />
            </Link>
        </div>
    )
}

export default Reverse_button
