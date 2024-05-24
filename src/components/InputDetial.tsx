import React, { ChangeEvent } from 'react';
import { useGlobal } from '@/context/context';

interface ComponentProps {
    rows?: number;
    detail: string;
    setValue: (value: string) => void;
}

const MyComponent: React.FC<ComponentProps> = ({ rows = 4, detail, setValue }) => {
    const { setAgentDescribe } = useGlobal();

    const handleDesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAgentDescribe(e.target.value);
        setValue(e.target.value);
        console.log("agent_describe value", e.target.value);
    };

    return (
        <div className="flex flex-col h-full">
            <form className="w-full">
                <label htmlFor="message" className="mb-2 text-sm font-medium text-white">
                    {detail}
                </label>
                <textarea
                    onChange={handleDesChange}
                    id="message"
                    rows={rows}
                    className="p-2.5 w-full text-sm text-white bg-[#3D434A] rounded-lg border border-[#6E6F70] focus:border-white"
                    placeholder="Add Text"
                >
                </textarea>
            </form>
        </div>
    );
};

export default MyComponent;
