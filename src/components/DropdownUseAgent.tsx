import React from "react";
import Image from "next/image";
import useDropdownUseAgent from "./hooks/DropdownUseAgent.hook";

interface DropdownItemProps {
  label: string;
  onSelect: () => void;
}

interface DropdownProps {
  content: string;
  placeholder: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ label, onSelect }) => (
  <button
    className="text-white p-2 text-[13px] w-full text-left bg-[#3D434A] hover:bg-gray-600 focus:bg-gray-600"
    onClick={onSelect}
  >
    {label}
  </button>
);

const Dropdown: React.FC<DropdownProps> = ({ content, placeholder }) => {
  const { useDropdownUseAgentItems } = useDropdownUseAgent(placeholder);
  return (
    <div className="text-left p-[1px]">
      <p className="text-white">{content}</p>
      <button
        className="flex justify-between w-full p-2 text-[14px] text-gray-400 hover:bg-gray-500 rounded-lg bg-[#3D434A] ring-[0.2px] ring-white"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded={useDropdownUseAgentItems.isOpen}
        onClick={() =>
          useDropdownUseAgentItems.setIsOpen(!useDropdownUseAgentItems.isOpen)
        }
      >
        {useDropdownUseAgentItems.nameList}
        <Image
          src="/png/arrowdown.png"
          alt="arrow down"
          height={20}
          width={20}
        />
      </button>

      {useDropdownUseAgentItems.isOpen && (
        <div className="w-full origin-top-right right-0 rounded-md shadow-sm">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {useDropdownUseAgentItems.stylePrompts?.map((stylePrompt, index) => (
              <DropdownItem
                key={index}
                label={stylePrompt.Name}
                onSelect={() => {
                  useDropdownUseAgentItems.setStyleMessageID(+(stylePrompt.ID));
                  useDropdownUseAgentItems.setNameList(stylePrompt.Name);
                  useDropdownUseAgentItems.setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
