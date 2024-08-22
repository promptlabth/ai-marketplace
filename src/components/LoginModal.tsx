import { ProfileUser, SignInUserCredential } from "@/models/interfaces/Login.interface";
import { LoginFunction } from "@/services/api/LoginUser";
import signInWithFacebook from "@/services/firebase/auth/AuthFacebook";
import signInWithGmail from "@/services/firebase/auth/AuthGmail";
import React, { useState, useEffect, ButtonHTMLAttributes } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoCloseOutline } from "react-icons/io5";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };


  // i think we will use context to this part for get some user detail

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleLoginOnClick = async (e: React.MouseEvent<HTMLButtonElement>) =>{

    var platform :string = ""

    var authResult: SignInUserCredential | null
    switch (e.currentTarget.name){
      case process.env.NEXT_PUBLIC_LOGIN_WITH_FACEBOOK:
        platform = "facebook"
        authResult = await signInWithFacebook()
        break;
      case process.env.NEXT_PUBLIC_LOGIN_WITH_GOOGLE:
        platform = "google"
        authResult = await signInWithGmail()
        break;
      default:
        // tigger something of project (ex model error, notification side bar)
        return 
    }
    if (authResult){
      const authorizationToken = await authResult.user.getIdToken()
      const result = await LoginFunction(
        {
          accessToken: authResult.accessToken == undefined ? "" : authResult.accessToken,
          platform: platform
        },
        authorizationToken
      )
      
      localStorage.setItem("authorization", authorizationToken)
      localStorage.setItem("typeLogin", platform)
    }


    // tigger for update profile

  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20"
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-[#212529] border-2 border-[#d0d4db] rounded-lg shadow-xl w-full max-w-md
                    ${isClosing ? 'animate-fade-up' : 'animate-fade-down'}
                    animate-duration-300 animate-ease-out`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative pt-6 pb-2">
          <h2 className="text-xl font-semibold text-center text-white">
            เข้าสู่ระบบ
          </h2>
          <button
            onClick={handleClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#02F6A9]"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <button 
            name={process.env.NEXT_PUBLIC_LOGIN_WITH_FACEBOOK}
            className="w-full bg-[#1877F2] text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-[#166fe5]"
            onClick={handleLoginOnClick}
          >
            <FaFacebook size={24} />
            <span>เข้าสู่ระบบด้วย Facebook</span>
          </button>
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">- or -</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>
          <button 
            name={process.env.NEXT_PUBLIC_LOGIN_WITH_GOOGLE}
            className="w-full border border-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700"
            onClick={handleLoginOnClick}  
          >
            <FcGoogle size={24} />
            <span>เข้าสู่ระบบด้วย Gmail</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;