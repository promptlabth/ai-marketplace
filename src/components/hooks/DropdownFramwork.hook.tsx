import React, { useEffect, useState } from "react";
import { RoleFrameworksInterface } from "@/models/interfaces/RoleFramework.interface";
import { GetRoleFrameworks } from "@/services/api/RoleFrameworkAPI";
import { useGlobal } from "@/context/context";
import { useTranslation } from "react-i18next";
const useDropdownFramwork = () => {
  const [roles, setRoles] = useState<RoleFrameworksInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {setRoleID } = useGlobal();
  const [showAll, setShowAll] = useState(false);
  const { i18n } = useTranslation();

  const handleGetRoleFrameworks = async () => {
    const result = await GetRoleFrameworks(i18n.language);
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

  const handlesetShowAll = () => {
    if (searchTerm == "") {
      setShowAll(false);
    } 
  };

  useEffect(() => {
    handleGetRoleFrameworks();
  }, []);

  useEffect(() => {
    handleGetRoleFrameworks();
  }, [i18n.language]);

  useEffect(() => {
    if (searchTerm != "") {
       setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [searchTerm]);

  const filteredRoles = roles.filter((role) =>
    role.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedItems = showAll
    ? filteredRoles
    : filteredRoles.slice(0, 5);
  return {
    DropdownFrameworkItems: {
      roles,
      searchTerm,
      setSearchTerm,
      handlesetRoleID,
      filteredRoles,
      displayedItems,
      showAll,
      handlesetShowAll,
      setShowAll
    },
  };
};

export default useDropdownFramwork;
