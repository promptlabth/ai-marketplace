import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface FailedPaymentModalProps {
  onClose: () => void;
}

const FailedPaymentModal: React.FC<FailedPaymentModalProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { t } = useTranslation("common");

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
              <button
                onClick={handleClose}
                className="absolute right-4 mt-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#02F6A9]"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4 justify-center items-center">
              <h2 className="text-xl font-semibold text-center text-white ">
                {/* เกิดข้อผิดพลาด */}
                {t("failedPayment.title")}
              </h2>
              <p className="text-[16px] text-center text-white ">
                {/* กรุณาลองใหม่ในภายหลัง */}
                {t("failedPayment.message")}
              </p>
              <button className="w-full border border-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700" onClick={handleClose}>
                {/* <span >ปิด</span> */}
                {t("failedPayment.close")}
              </button>
            </div>
          </div>
        </div>
  );
}

export default FailedPaymentModal;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});