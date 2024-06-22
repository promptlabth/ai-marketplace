import React, { useState } from 'react';
import { RiMenu4Fill } from "react-icons/ri";
import { useRouter } from 'next/router';
import { TFunction } from 'next-i18next';

interface StudioMenuProps {
    translations: TFunction;
}

const StudioMenu: React.FC<StudioMenuProps> = ({ translations }) => {
    const [open, setOpen] = useState<string>("invisible");

    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    const isActive = (route: string) => {
        return router.pathname === route ? 'bg-gray-800 rounded-xl border' : 'bg-gray-700';
    }

    const Menu: React.FC<{ isOpen: string }> = ({ isOpen }) => {
        return (
          <div
            className={`fixed p-3 right-0 top-0 w-[250px] h-full z-50 bg-gray-700 ${isOpen} `}
          >
            <button
              onClick={toggleMenu}
              className=" font-bold text-xl flex w-full text-white justify-end px-4 py-2"
            >
              x
            </button>
            <div className="flex flex-col gap-2 w-full h-full">
              <button
                onClick={() => navigateTo("/creator/profile")}
                className={`flex justify-start w-full text-gray-200 p-2 hover:rounded-xl hover:border focus:rounded-xl focus:border ${isActive(
                  "/creator/profile"
                )}`}
              >
                {translations("studio.Profile")}
              </button>
              <button
                onClick={() => navigateTo("/creator/create_agent")}
                className={`flex justify-start w-full text-gray-200 p-2 hover:rounded-xl hover:border focus:rounded-xl focus:border ${isActive(
                  "/creator/create_agent"
                )}`}
              >
                {translations("studio.CreateAgent")}
              </button>
              <button
                onClick={() => navigateTo("/creator/dashboard_overall")}
                className={`flex justify-start w-full text-gray-200 p-2 hover:rounded-xl hover:border focus:rounded-xl focus:border ${isActive(
                  "/creator/dashboard_overall"
                )}`}
              >
                {translations("studio.AIReportOverview")}
              </button>
              <button
                onClick={() => navigateTo("/creator/list_agent")}
                className={`flex justify-start w-full text-gray-200 p-2 hover:rounded-xl hover:border focus:rounded-xl focus:border ${isActive(
                  "/creator/list_agent"
                )}`}
              >
                {translations("studio.ListAI")}
              </button>
              <button
                onClick={() => navigateTo("/creator/payments")}
                className={`flex justify-start w-full text-gray-200 p-2 hover:rounded-xl hover:border focus:rounded-xl focus:border ${isActive(
                  "/creator/payments"
                )}`}
              >
                {translations("studio.Payment")}
              </button>
            </div>
          </div>
        );
    }

    const toggleMenu = () => {
        const newState = open === "invisible" ? "visible" : "invisible";
        setOpen(newState);
    }

    return (
        <div >
            <Menu isOpen={open} />
            <button onClick={toggleMenu} className='flex focus:scale-95 hover:scale-95 animate-fade-down'>
                <RiMenu4Fill size={30} color='#03FFAB' />
            </button>
        </div>
    );
}

export default StudioMenu;
