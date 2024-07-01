import React, { ChangeEvent } from "react";
import { InitialsPeompt } from "@/models/interfaces/InitialsPeompt.interface";
import useFrameworks from "./hooks/Framework.hook";

interface InputDetailProps {
  rows?: number;
  detail: string;
  text_placeholder: string;
  setValue: (value: string) => void;
}

const InputDetail: React.FC<InputDetailProps> = ({
  rows = 4,
  detail,
  text_placeholder,
  setValue,
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
          id="message"
          rows={rows}
          className="p-2.5 w-full text-sm text-white bg-[#3D434A] rounded-lg border border-[#6E6F70] focus:border-white"
          placeholder={text_placeholder}
        ></textarea>
      </form>
    </div>
  );
};

export default InputDetail;
