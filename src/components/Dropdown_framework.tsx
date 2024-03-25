import React from 'react';
import Image from 'next/image';
import data from '@/domain/creator/create_agent/__mock__/framework .json';
import useDropdown from './hooks/Dropdown.hook';

interface DropdownItemProps {
    label: string;
    onSelect: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, onSelect }) => (
    <button
        className="text-white p-2 text-[13px] w-full text-left bg-[#3D434A] hover:bg-gray-600 focus:bg-gray-600"
        onClick={onSelect}
    >
        {label}
    </button>
);

const Dropdown: React.FC<{ json_data: string }> = ({ json_data }) => {

    const { DropdownItems } = useDropdown(data, json_data);

    return (
        <div className="relative text-left p-[1px]">
            <button
                ref={DropdownItems.toggleRef}
                className="flex justify-between w-full p-2 text-[14px] text-gray-400 hover:bg-gray-500 rounded-lg bg-[#3D434A] ring-[0.2px] ring-white"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={() => DropdownItems.setIsOpen(!DropdownItems.isOpen)}
            >
                {DropdownItems.nameList}
                <Image src="/png/arrowdown.png" alt="arrow down" height={20} width={20} />
            </button>

            {DropdownItems.isOpen && DropdownItems.selectedFrameworkDetails && (
                <div
                    ref={DropdownItems.dropdownRef}
                    className="w-full origin-top-right absolute right-0 rounded-md shadow-sm rounded"
                >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {DropdownItems.selectedFrameworkDetails.component.filter(item => item.type === 'dropdown').map((dropdownItem, index) =>
                            dropdownItem.role ? dropdownItem.role.map((role, roleIndex) => (
                                <DropdownItem
                                    key={`${index}-${roleIndex}`}
                                    label={role}
                                    onSelect={() => { DropdownItems.setNameList(role); DropdownItems.setIsOpen(false); }}
                                />
                            )) : null
                        )}
                    </div>
                </div>
            )}
        </div>
    );

};

export default Dropdown;
