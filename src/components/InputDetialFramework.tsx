import { TFunction } from "next-i18next";
import React, { ChangeEvent } from "react";

interface InputDetailFrameworkProps {
  rows?: number;
  detail: string;
  promptValues: string;
  setValue: (value: string) => void;
  translations: TFunction;
}

const InputDetailFramework: React.FC<InputDetailFrameworkProps> = ({
  rows = 4,
  detail,
  promptValues,
  setValue,
  translations,
}) => {
  const handleDesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col h-full">
      <form className="w-full">
        <label
          htmlFor="message"
          className="mb-2 text-sm font-medium text-white"
        >
          {detail}
        </label>
        <textarea
          onChange={handleDesChange}
          value={promptValues != "" ? promptValues : ""}
          id="message"
          rows={rows}
          className="p-2.5 w-full text-sm text-white bg-[#3D434A] rounded-lg border border-[#6E6F70] focus:border-white"
          placeholder={translations(
            "editAgent.inputDetailFramework.placeholder"
          )}
        ></textarea>
      </form>
    </div>
  );
};

export default InputDetailFramework;
