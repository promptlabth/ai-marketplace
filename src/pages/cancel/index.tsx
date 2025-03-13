import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaTimesCircle } from "react-icons/fa";
import Navbar from "@/components/Navbar";

const CancelPage = () => {
    const { t } = useTranslation("common");
    const router = useRouter();

    const handleBackToHome = () => {
        router.push("/");
    }

    const handleToSubscribe = () => {
        setTimeout(() => {
            router.push("/customer/subscription");
        }, 500); // เพิ่ม delay ให้ router ได้ถูกต้อง
    }
    
    return (
        <div className="bg-[#212529] p-6 min-h-screen flex flex-col justify-center items-center">
            <Navbar />
            <div className="absolute top-4 right-4">
                <div className="flex gap-2">
                
                </div>
            </div>
            <div className="flex flex-col w-full sm:w-[900px] min-h-screen rounded-xl py-4 px-4 gap-4 items-center justify-center">
            <FaTimesCircle size={80} className="text-red-500 mb-4" />
                <h1 className="text-white text-[40px]">
                    {t("cancel.title")}
                    {/* Cancel */}
                </h1>
                <p className="text-white text-[20px] text-center">
                    {t("cancel.message")}
                    {/* ทำการยกเลิกการสมัครสมาชิกแล้ว */}
                </p>
                <button
                    className="mt-4 w-full border border-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700"
                    onClick={handleBackToHome}
                >
                    <span>
                        {t("cancel.back_to_home")}
                        {/* กลับไปที่หน้าโฮม */}
                    </span>
                </button>
                <button
                    className="w-full border border-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700"
                    onClick={handleToSubscribe}
                >
                    <span>
                        {t("cancel.go_to_subscription")}
                        {/* ไปที่หน้าสมัครสมาชิก */}
                    </span>
                </button>
            </div>
            
        </div>
    );
}

export default CancelPage;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});