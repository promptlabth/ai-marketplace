import { ChangeEvent } from "react";
import { useGlobal } from "@/context/context";

interface InputNameprops {
    name_label: string;
}

const InputNameAgent: React.FC<InputNameprops> = ({ name_label }) => {
    const { setAgentName } = useGlobal();

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAgentName(event.target.value);
      };

    return (
        <div className="flex flex-col w-3/4">
            <label htmlFor="aiName" className="text-white">
                {name_label}
            </label>
            <input
                onChange={handleNameChange}
                type="text"
                id="aiName"
                name="aiName"
                placeholder="Add text"
                aria-label="Enter AI name here"
                className="mt-2 h-[40px] rounded p-2 bg-[#3D434A] ring-1 ring-[#6E6F70] focus:ring-white text-white"
            />
        </div>
    )
}

export default InputNameAgent;