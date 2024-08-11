import { useGlobal } from "@/context/context";
import { StylePromptsInterface } from "@/models/interfaces/StylePrompt.interface";
import { GetStylePrompts } from "@/services/api/StylePrompAPI";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const useDropdownUseAgent = (placeholder: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nameList, setNameList] = useState(`${placeholder}`);
  const [stylePrompts, setStylePrompts] = useState<StylePromptsInterface[]>([]);
  const { i18n } = useTranslation();
  const { style_message_id, setStyleMessageID } = useGlobal();

  const handleGetStylePrompts = async () => {
    const result = await GetStylePrompts(i18n.language);
    console.log("result", result);
    if (result) {
      const sortedStylePrompts = result.data?.sort(
        (a: StylePromptsInterface, b: StylePromptsInterface) =>
          a.Name.localeCompare(b.Name)
      );
      console.log("sortedStylePrompts", sortedStylePrompts);
      setStylePrompts(sortedStylePrompts);
    }
  };
  useEffect(() => {
    handleGetStylePrompts();
    setNameList(placeholder);
  }, [i18n.language]);

  return {
    useDropdownUseAgentItems: {
      stylePrompts,
      setNameList,
      nameList,
      setIsOpen,
      isOpen,
      setStyleMessageID,
    },
  };
};

export default useDropdownUseAgent;
