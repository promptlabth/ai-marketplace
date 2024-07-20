import { GetMessages } from "@/services/api/GetMessagesAPI";
import React from "react";

interface ButtonProps {
  name_button: string;
  handleGenerate: () => void;
}

const ButtonGenerate: React.FC<ButtonProps> = ({
  name_button,
  handleGenerate,
}) => {
  return (
    <button
      onClick={handleGenerate}
      className="flex-auto hover:bg-[#03FFAB] hover:text-white focus:bg-[#03FFAB] sm:text-[17px] sm:font-bold focus:text-black h-[40px] w-full ring-2 ring-[#03FFAB] ring-inset rounded-full text-[12px] text-[#03FFAB]"
    >
      {name_button}
    </button>
  );
};

export default ButtonGenerate;
