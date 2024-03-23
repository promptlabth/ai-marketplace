import React, { useState } from 'react';
import APE from "@/pages/creator/edit_agent/ape";
import ERA from '@/pages/creator/edit_agent/era';
import TAG from '@/pages/creator/edit_agent/tag';
import RICEE from '@/pages/creator/edit_agent/ricee';
import RPPPP from '@/pages/creator/edit_agent/rpppp';

interface ButtonConfig {
    label: string;
    component: React.FC<any>;
}

const Framework: React.FC = () => {
    const [activeButton, setActiveButton] = useState<number>(0);
    const buttons: ButtonConfig[] = [
        { label: 'APE', component: APE },
        { label: 'ERA', component: ERA },
        { label: 'TAG', component: TAG },
        { label: 'RICEE', component: RICEE },
        { label: 'RPPPP', component: RPPPP },
    ];

    const RenderComponent = () => {
        if (activeButton !== null) {
            const Component = buttons[activeButton].component;
            return <Component />;
        }
        return null;
    };

    return (
        <div className='flex flex-col w-full h-full'>
            <p className='text-white'>เลือก Framework ของ AI</p>
            <div className="overflow-x-auto">
                <div className="flex flex-row xl:justify-center snap-mandatory space-x-2 p-2">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={`flex-none w-[90px] h-[40px] sm:w-[220px] snap-center items-center flex justify-center ${activeButton === index ? 'bg-transparent text-white' : 'bg-[#03FFAB] text-black'} font-bold rounded-xl`}
                            onClick={() => setActiveButton(index)}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
            <RenderComponent />
        </div>
    );
};

export default Framework;
