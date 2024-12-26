import { ChangeEvent } from "react";
import { useGlobal } from "@/context/context";

interface InputLanguageProps {
  language_label: string;
}

const InputLanguage: React.FC<InputLanguageProps> = ({ language_label }) => {
  const { setLanguage } = useGlobal();

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="language" className="text-white">
        {language_label}
      </label>
      <select
        onChange={handleLanguageChange}
        id="language"
        name="language"
        aria-label="Select language"
        className="mt-2 h-[40px] rounded p-2 bg-[#3D434A] ring-1 ring-[#6E6F70] focus:ring-white text-white"
      >
        <option value="TH">ไทย</option>
        <option value="EN">English</option>
      </select>
    </div>
  );
};

export default InputLanguage;