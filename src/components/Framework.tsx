import React, { useState, useEffect } from 'react';
import Dropdown from '@/components/Dropdown_framework'
import InputDetial from "@/components/InputDetial"
import data from '@/domain/creator/create_agent/__mock__/framework .json';

const FrameworkComponent = () => {
    const [nameframework, setNameframework] = useState<string>(data[0].framework);
    const [selectedFrameworkDetails, setSelectedFrameworkDetails] = useState(data[0]);

    useEffect(() => {
        const frameworkDetails = data.find(framework => framework.framework === nameframework);
        if (frameworkDetails) {
            setSelectedFrameworkDetails(frameworkDetails);
        }
    }, [nameframework]);

    return (
        <div className='flex flex-col w-full h-full'>
            <p className='text-white'>เลือก Framework ของ AI</p>
            <div className="overflow-x-auto">
                <div className="flex flex-row xl:justify-center snap-x space-x-2 p-2 ">
                    {data.map((framework, index) => (
                        <button
                            key={index}
                            className={`flex-none snap-center w-[90px] h-[40px] sm:w-[220px] items-center flex justify-center ${nameframework === framework.framework ? 'bg-transparent text-white' : 'bg-[#03FFAB] text-black'} font-bold rounded-xl`}
                            onClick={() => {
                                setNameframework(framework.framework);
                            }}
                        >
                            {framework.framework}
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex w-full flex-col gap-3 overflow-x-auto'>
                <p className='p-2 mt-4 text-white text-[12px] border-b-2'>{selectedFrameworkDetails.detail}</p>
                {selectedFrameworkDetails.component.map((comp, index) => {
                    switch (comp.type) {
                        case 'dropdown':
                            return <Dropdown key={index} json_data={nameframework} label_name={comp.label} />;
                        case 'add_text':
                            return <InputDetial key={index} detail={comp.label} />;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default FrameworkComponent;
