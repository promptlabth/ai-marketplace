import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ButtonLogin from "@/components/ButtonLogin";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import LoginModal from "@/components/LoginModal";
import StudioMenu from "@/components/StudioiMenu"; // import your SampleComponent
import { useTranslation } from "next-i18next";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [userPic, setUserPic] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const profile_pic = userData.user?.profile_pic ;
    console.log(profile_pic);
    setUserPic(profile_pic);
    if (storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData).user);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="z-9 fixed top-5 right-5 max-h-[74px] flex items-center justify-end px-4">
      <div className="flex items-center">
        <ButtonChangeLanguage />
        {router.pathname.startsWith("/creator") && (
          <StudioMenu translations={t} />
        )}
        
          
        {isLoggedIn ? (
          <div className="relative animate-fade-down" ref={dropdownRef}>
            <img
              src={userPic}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer mx-3"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-2">
                  <Link
                    href="/creator/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    {t("nav.profile.title")}
                  </Link>
                  <Link
                    href="/creator/dashboard_overall"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    {t("nav.dashboard.title")}
                  </Link>
                    <Link
                    href="/"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => {
                      localStorage.removeItem("userData");
                      localStorage.removeItem("user_id");
                      localStorage.removeItem("authorization");
                      localStorage.removeItem("token");
                      localStorage.removeItem("username");
                      setIsLoggedIn(false);
                      setUserData(null);
                    }}
                    >
                    {t("nav.logout.title")}
                    </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <ButtonLogin onClick={openModal} />
        )}
      </div>
      {isModalOpen && <LoginModal onClose={closeModal} />}
    </div>
  );
};

export default Navbar;
