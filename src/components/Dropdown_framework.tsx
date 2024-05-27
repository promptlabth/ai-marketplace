import React, { useEffect, useState } from "react";
import Image from "next/image";
import useDropdown from "./hooks/Dropdown.hook";
import { RoleFrameworksInterface } from "@/models/interfaces/RoleFramework.interface";
import { apiGetRoleFrameworks } from "@/services/api/RoleFrameworkAPI";
import { Framework } from "@/models/interfaces/Framework.interface";
import { useGlobal } from "@/context/context";

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
  const [roles, setRoles] = useState<RoleFrameworksInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { role_framework_id, setRoleID } = useGlobal();
  const handleGetRoleFrameworks = async () => {
    const result = await apiGetRoleFrameworks();
    if (result) {
      // Sort roles by name in ascending order (A-Z)
      const sortedRoles = result.roles.sort(
        (a: RoleFrameworksInterface, b: RoleFrameworksInterface) =>
          a.Name.localeCompare(b.Name)
      );
      console.log("sortedRoles",sortedRoles);
      setRoles(sortedRoles);
    }
  };
  const handlesetRoleID = (id: number) => {
    setRoleID(id);
  };

  useEffect(() => {
    handleGetRoleFrameworks();
  }, []);

  const { DropdownItems } = useDropdown(data, json_data);

  // Filter roles based on search term
  const filteredRoles = roles.filter((role) =>
    role.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-left p-[1px]">
      <p className="text-white">{label_name}</p>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value), DropdownItems.setIsOpen(true);
          }}
          onClick={(e) => { DropdownItems.setIsOpen(true) }}
          placeholder="Search..."
          className="w-full p-2 text-[14px] text-gray-400 hover:bg-gray-500 rounded-lg bg-[#3D434A] ring-[0.2px] ring-white"
        />
        <button
          ref={DropdownItems.toggleRef}
          className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-10 text-white"
          onClick={() => DropdownItems.setIsOpen(!DropdownItems.isOpen)}
        >
          <Image
            src="/png/arrowdown.png"
            alt="arrow down"
            height={20}
            width={20}
          />
        </button>
      </div>

      {DropdownItems.isOpen && filteredRoles.length > 0 && (
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
            {filteredRoles.map((role, index) => (
              <DropdownItem
                key={index}
                label={role.Name}
                onSelect={() => {
                  handlesetRoleID(Number(role.ID));
                  DropdownItems.setNameList(role.Name);
                  DropdownItems.setIsOpen(false);
                  setSearchTerm(role.Name);
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
