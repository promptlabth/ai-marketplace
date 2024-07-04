// ButtonLogin.tsx
import React from 'react';

interface ButtonLoginProps {
  onClick?: () => void;
}

const ButtonLogin: React.FC<ButtonLoginProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 w-15 text-white animate-fade-down bg-[#212529] border-2 border-[#02F6A9] rounded-full hover:bg-[#02F6A9] hover:text-[#212529] hover:transform hover:scale-105 hover:shadow-md transition-all duration-200"
    >
      เข้าสู่ระบบ
    </button>
  );
};

export default ButtonLogin;
