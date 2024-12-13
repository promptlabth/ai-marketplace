import {
  ProfileUser,
  SignInUserCredential,
  LoginResponse
} from "@/models/interfaces/Login.interface";
import signInWithFacebook from "@/services/firebase/auth/AuthFacebook";
import signInWithGmail from "@/services/firebase/auth/AuthGmail";
import { RegisterUser } from "@/services/api/RegisterUser"; // Import the registration function
import React, { useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoCloseOutline } from "react-icons/io5";
import { useGlobal } from "@/context/context";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { handleSetUser } = useGlobal();

  const handleClose = () => {
    setIsClosing(true);
  };

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

  const handleLoginOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let platform: string = "";
    let authResult: SignInUserCredential | null = null;

    console.log(e.currentTarget.name);
    switch (e.currentTarget.name) {
      case process.env.NEXT_PUBLIC_LOGIN_WITH_FACEBOOK:
        platform = "facebook";
        authResult = await signInWithFacebook();
        break;
      case process.env.NEXT_PUBLIC_LOGIN_WITH_GOOGLE:
        platform = "gmail";
        authResult = (await signInWithGmail()) || null;
        if (authResult != null) {
          const authToken = await authResult.user.getIdToken();
          localStorage.setItem("authorization", authToken);
          console.log(authResult);
        }
        break;
      default:
        // trigger something of project (ex model error, notification side bar)
        return;
    }

    if (authResult) {
      const authorizationToken = await authResult.user.getIdToken();
      const userData = {
        firebase_id: authResult.user.uid,
        name: authResult.user.displayName || "Anonymous",
        email: authResult.user.email || "",
        platform: platform,
        stripe_id: "stripe_id_example",
        plan_id: "plan_id_example",
        profile_pic: authResult.user.photoURL || "",
        access_token: authorizationToken,
      };

      const result: LoginResponse | null = await RegisterUser(userData, authorizationToken);
      console.log("Login result:", result);

      if (result && result.user && result.user.id) {
        const profileUser: ProfileUser = {
          user: {
            id: result.user.id,
            firebase_id: result.user.firebase_id,
            name: result.user.name,
            email: result.user.email,
            platform: result.user.platform,
            plan_id: result.user.plan_id,
            profile_pic: result.user.profile_pic,
            access_token: result.user.access_token,
          },
        };
        localStorage.setItem("authorization", result.token);
        localStorage.setItem("typeLogin", platform);
        localStorage.setItem("userData", JSON.stringify(profileUser));
        localStorage.setItem("firebase_id", result.user.firebase_id); // Set firebase_id as a new item
        handleSetUser(profileUser);
        window.location.href = "/creator/profile";
      } else {
        console.error("Login failed:", result);
      }
    } else {
      console.error("Authentication failed");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-[#212529] border-2 border-[#d0d4db] rounded-lg shadow-xl w-full max-w-md
                    ${isClosing ? "animate-fade-up" : "animate-fade-down"}
                    animate-duration-300 animate-ease-out `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative pt-6 pb-2">
          <h2 className="text-xl font-semibold text-center text-white ">
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