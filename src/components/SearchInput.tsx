import React, { useState } from 'react';

interface InputNameProps {
  name_label: string;
  placeholder: string;
  invisible: string;
  onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<InputNameProps> = ({ name_label, placeholder, invisible, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className={`flex flex-col w-full ${invisible}`}>
      <label htmlFor="aiName" className="text-white">
        {name_label}
      </label>
      <input
        type="text"
        id="aiName"
        name="aiName"
        placeholder={placeholder}
        aria-label="Enter AI name here"
        className="bg-[url('/png/search.png')] bg-no-repeat bg-center-left pl-10 pr-2 h-[40px] w-full rounded bg-[#3D434A] text-white ring-1 ring-[#6E6F70] focus:ring-white"
        style={{ backgroundPositionX: '10px', backgroundPositionY: '10px', backgroundSize: '20px 20px' }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchInput;
