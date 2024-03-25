import React from 'react'

interface Outputtype {
    content: string;
    generate: string;
}

const Outputtext: React.FC<Outputtype> = ({ content, generate }) => {
    return (
        <div className='flex flex-col grow'>
            <p className='text-white'>{content}</p>
            <div className='flex-1 rounded-lg bg-[#3D434A] p-4'>
                <p className='text-white text-lg'>{generate}</p>
            </div>
        </div>
    )
}

export default Outputtext;
