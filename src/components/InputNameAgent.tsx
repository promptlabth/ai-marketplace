interface InputNameprops {
    name_label: string;
}

const InputNameAgent: React.FC<InputNameprops> = ({ name_label }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor="aiName" className="text-white">
                {name_label}
            </label>
            <input
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