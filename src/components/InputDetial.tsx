import React from 'react';

interface ComponentProps {
    rows?: number; 
}

const MyComponent: React.FC<ComponentProps> = ({ rows = 4 }) => { 
    return (
        <div className="flex flex-col h-full">
            <form className="w-full">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">อธิบายเกี่ยวกับ AI ของคุณ</label>
                <textarea
                    id="message"
                    rows={rows}
                    className="p-2.5 w-full text-sm text-white bg-[#3D434A] rounded-lg border border-[#6E6F70] focus:ring-white focus:border-white"
                    placeholder="Add Text">
                </textarea>
            </form>
        </div>
    );
};

export default MyComponent;
