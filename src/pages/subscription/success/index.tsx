import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "@/components/Navbar";

const SuccessPage = () => {
    const { t } = useTranslation("common");
    const router = useRouter();

    const handleBackToHome = () => {
        router.push("/creator/profile");
    }

    const handleToSubscribe = () => {
        router.push("/customer/marketplace");
    }
    
    return (
        <div className="bg-[#212529] p-6 min-h-screen flex flex-col justify-center items-center">
            <Navbar />
            <div className="absolute top-4 right-4">
                <div className="flex gap-2">
                
                </div>
            </div>
            <div className="flex flex-col w-full sm:w-[900px] min-h-screen rounded-xl py-4 px-4 gap-4 items-center justify-center">
            <FaCheckCircle size={80} className="text-green-600 mb-4" />
                <h1 className="text-white text-[40px]">
                    {t("success.title")}
                    {/* Cancel */}
                </h1>
                <p className="text-white text-[20px] text-center">
                    {t("success.message")}
                    {/* ทำการยกเลิกการสมัครสมาชิกแล้ว */}
                </p>
                <button
                    className="mt-4 w-1/2 border border-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700"
                    onClick={handleBackToHome}
                >
                    <span>
                        {t("success.go_to_profile")}
                    </span>
                </button>
                <button
                    className="w-1/2 border border-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700"
                    onClick={handleToSubscribe}
                >
                    <span>
                        {t("success.go_to_ai_shop")}
                    </span>
                </button>
            </div>
            
        </div>
    );
}

export default SuccessPage;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});