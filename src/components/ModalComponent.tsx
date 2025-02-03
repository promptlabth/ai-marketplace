import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdWarning } from "react-icons/md"; // Import the warning icon
import { useTranslation } from "next-i18next";

interface ModalComponentProps {
  message: string;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ message, onClose }) => {
  const { t } = useTranslation("common");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#212529] border-2 border-[#d0d4db] rounded-lg shadow-xl w-full max-w-md">
        <div className="relative pt-6 pb-2">
          <h2 className="text-xl font-semibold text-center text-white">{t("notification.title")}</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#02F6A9]"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <div className="p-6 space-y-4 flex flex-col items-center">
          <MdWarning size={48} className="text-[#FFA500]" /> {/* Add the warning icon */}
          <p className="text-white text-center">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-[#02F6A9] text-white py-2 px-4 rounded-md hover:bg-[#02D89A]"
          >
            {t("notification.close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;