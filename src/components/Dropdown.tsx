import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface DropdownItemProps {
    label: string;
    onSelect: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, onSelect }) => (
    <button
        className="text-white p-2 text-[13px] w-full text-left bg-[#3D434A] hover:bg-gray-600 "
        onClick={onSelect}
    >
        {label}
    </button>
);

const Dropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [namelist, setNamelist] = useState("Role1")
    const toggleRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            toggleRef.current &&
            !toggleRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative text-left p-[1px]">
            <button
                ref={toggleRef}
                className="flex justify-between w-full p-2 text-[14px] text-gray-400 hover:bg-gray-500 rounded-lg bg-[#3D434A] ring-[0.2px] ring-white"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={() => setIsOpen(!isOpen)}
            >
                {namelist}
                <Image src="/png/arrowdown.png" alt='' height={20} width={20} />
            </button>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="w-full origin-top-right absolute right-0 rounded-md shadow-sm rounded"
                >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <DropdownItem label="Role1" onSelect={() => setNamelist("Role1")} />
                        <DropdownItem label="Role2" onSelect={() => setNamelist("Role2")} />
                        <DropdownItem label="Role3" onSelect={() => setNamelist("Role3")} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
