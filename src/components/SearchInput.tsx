import Image from "next/image";

interface InputNameprops {
    name_label: string;
    placholder: string;
}

const SearchInput: React.FC<InputNameprops> = ({ name_label, placholder }) => {
    return (
        <div className="flex flex-col w-full">
            <label htmlFor="aiName" className="text-white">
                {name_label}
            </label>
            <div className="flex items-center w-full gap-2" > 
                <input
                    type="text"
                    id="aiName"
                    name="aiName"
                    placeholder={placholder}
                    aria-label="Enter AI name here"
                    className="mt-2 h-[40px] w-full rounded p-2 bg-[#3D434A] ring-1 ring-[#6E6F70] focus:ring-white text-white"
                />
                <Image src="/png/search.png" height={20} width={20} alt="No image" />
            </div>
        </div>
    )
}

export default SearchInput;