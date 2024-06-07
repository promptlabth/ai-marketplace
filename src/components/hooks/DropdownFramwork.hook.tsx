import React, { useEffect, useState } from "react";
import { RoleFrameworksInterface } from "@/models/interfaces/RoleFramework.interface";
import { GetRoleFrameworks } from "@/services/api/RoleFrameworkAPI";
import { useGlobal } from "@/context/context";
const useDropdownFramwork = () => {
  const [roles, setRoles] = useState<RoleFrameworksInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
const { role_framework_id, setRoleID } = useGlobal();
    
  const handleGetRoleFrameworks = async () => {
    const result = await GetRoleFrameworks();
    if (result) {
      const sortedRoles = result.roles.sort(
        (a: RoleFrameworksInterface, b: RoleFrameworksInterface) =>
          a.Name.localeCompare(b.Name)
      );
      console.log("sortedRoles", sortedRoles);
      setRoles(sortedRoles);
    }
  };
  const handlesetRoleID = (id: number) => {
    setRoleID(id);
  };

  useEffect(() => {
    handleGetRoleFrameworks();
  }, []);

  const filteredRoles = roles.filter((role) =>
    role.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    DropdownFrameworkItems: {
      roles,
      searchTerm,
      setSearchTerm,
      handlesetRoleID,
      filteredRoles,
    },
  };
};

export default useDropdownFramwork;
