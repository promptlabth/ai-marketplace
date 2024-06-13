import React, { useState } from "react";
import Image from "next/image";
import useDropdown from "./hooks/Dropdown.hook";
import { Framework } from "@/models/interfaces/Framework.interface";
import useDropdownFramwork from "./hooks/DropdownFramwork.hook";
import { RoleFrameworksInterface } from "@/models/interfaces/RoleFramework.interface";

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

const Dropdown: React.FC<{
  json_data: string;
  label_name: string;
  data: Framework[];
}> = ({ json_data, label_name, data }) => {
  const { DropdownItems } = useDropdown(data, json_data);
  const { DropdownFrameworkItems } = useDropdownFramwork();

  return (
    <div className="text-left p-[1px]">
      <p className="text-white">{label_name}</p>
      <div className="relative">
        <input
          type="text"
          value={DropdownFrameworkItems.searchTerm}
          onChange={(e) => {
            DropdownFrameworkItems.setSearchTerm(e.target.value),
              DropdownItems.setIsOpen(true);
          }}
          onClick={() => {
            DropdownItems.setIsOpen(true);
            DropdownFrameworkItems.handlesetShowAll();
          }}
          placeholder="Search..."
          className="w-full p-2 text-[14px] text-gray-400 hover:bg-gray-500 rounded-lg bg-[#3D434A] ring-[0.2px] ring-white"
        />
        <button
          ref={DropdownItems.toggleRef}
          className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-10 text-white"
          onClick={() => {
            DropdownItems.setIsOpen(!DropdownItems.isOpen)
            DropdownFrameworkItems.handlesetShowAll();
           }}
        >
          <Image
            src="/png/arrowdown.png"
            alt="arrow down"
            height={20}
            width={20}
          />
        </button>
      </div>

      {DropdownItems.isOpen &&
        DropdownFrameworkItems.filteredRoles.length > 0 && (
          <div
            ref={DropdownItems.dropdownRef}
            className="w-full origin-top-right right-0 rounded-md shadow-sm"
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {DropdownFrameworkItems.displayedItems.map((role, index) => (
                <DropdownItem
                  key={index}
                  label={role.Name}
                  onSelect={() => {
                    DropdownFrameworkItems.handlesetRoleID(Number(role.ID));
                    DropdownItems.setNameList(role.Name);
                    DropdownItems.setIsOpen(false);
                    DropdownFrameworkItems.setSearchTerm(role.Name);
                    // DropdownFrameworkItems.handlesetShowAll();
                  }}
                />
              ))}
              {!DropdownFrameworkItems.showAll && (
                  <DropdownItem
                    label="..."
                    onSelect={() => DropdownFrameworkItems.setShowAll(true)}
                  />
                )}
            </div>
          </div>
        )}
    </div>
  );
};

export default Dropdown;
