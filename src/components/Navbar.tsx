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
  const [userPic, setUserPic] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authorization");
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User data XD:", data);
        setUserPic(data.profile_pic);
        setUserData(data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserData(null);
    setUserPic(null);
    router.push("/");
  };

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
    <div className="fixed top-0 right-0 left-0 max-h-[74px] flex items-center justify-end px-0 z-10 bg-[#212529]">
      <div className="flex items-center">
        <div>
          {userData && userData.max_messages !== undefined ? (
            <div className="text-white font-bold animate-fade-down">
              {t("nav.max_msg")} <span className="text-[#02ffac]">{userData.used_messages}/{userData.max_messages}</span>
            </div>
          ) : (
            <div color="text-[#02ffac] animate-fade-down"></div>
          )}
        </div>
        <ButtonChangeLanguage />
        {router.pathname.startsWith("/creator") && (
          <StudioMenu translations={t} />
        )}
        
          
        {isLoggedIn ? (
          <div className="relative animate-fade-down" ref={dropdownRef}>
            <img
              src={userPic || ''}
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
                    onClick={handleLogout}
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
