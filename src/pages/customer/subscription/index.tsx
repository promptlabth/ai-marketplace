import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, } from "@material-tailwind/react";
import { useTranslation } from "next-i18next";

const Subscription = () => {
    const { t } = useTranslation("common");
    const [plan, setPlan] = useState<string | null>("Free")

    function CheckIcon() {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        );
    }

    function FreeIcon() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="h-40 w-40"
            >
                <defs>
                    <linearGradient id="grad1" x1="100%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#388e3c", stopOpacity: 1 }} /> {/* green-700 */}
                        <stop offset="100%" style={{ stopColor: "#66bb6a", stopOpacity: 1 }} /> {/* green-400 */}
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" strokeWidth="2" fill="url(#grad1)" />
                <text x="50%" y="44%" textAnchor="middle" fill="white" strokeWidth="1px" dy=".3em" fontSize="24">0฿</text>
                <text x="50%" y="66%" textAnchor="middle" fill="white" strokeWidth="1px" dy=".3em" fontSize="12">{t("customer.subscription.price")}</text>
            </svg>
        );
    }

    function BronzeIcon() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="h-40 w-40"
            >
                <defs>
                    <linearGradient id="grad2" x1="100%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#f57c00", stopOpacity: 1 }} /> {/* orange-700 */}
                        <stop offset="100%" style={{ stopColor: "#ffb74d", stopOpacity: 1 }} /> {/* orange-300 */}
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" strokeWidth="2" fill="url(#grad2)" />
                <text x="50%" y="44%" textAnchor="middle" fill="white" strokeWidth="1px" dy=".3em" fontSize="24">59฿</text>
                <text x="50%" y="66%" textAnchor="middle" fill="white" strokeWidth="1px" dy=".3em" fontSize="12">{t("customer.subscription.price")}</text>
            </svg>
        );
    }

    function SilverIcon() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="h-40 w-40"
            >
                <defs>
                    <linearGradient id="grad3" x1="100%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#616161", stopOpacity: 1 }} /> {/* silver-700 */}
                        <stop offset="100%" style={{ stopColor: "#bdbdbd", stopOpacity: 1 }} /> {/* silver-400 */}
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" strokeWidth="2" fill="url(#grad3)" />
                <text x="50%" y="44%" textAnchor="middle" fill="white" strokeWidth="1px" dy=".3em" fontSize="24">199฿</text>
                <text x="50%" y="66%" textAnchor="middle" fill="white" strokeWidth="1px" dy=".3em" fontSize="12">{t("customer.subscription.price")}</text>
            </svg>
        );
    }

    function GoldIcon() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="h-40 w-40"
            >
                <defs>
                    <linearGradient id="grad4" x1="100%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#f9a825", stopOpacity: 1 }} /> {/* yellow-800 */}
                        <stop offset="100%" style={{ stopColor: "#ffeb3b", stopOpacity: 1 }} /> {/* yellow-500 */}
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" strokeWidth="2" fill="url(#grad4)" />
                <text x="50%" y="44%" textAnchor="middle" fill="white" strokeWidth="1px" dy=".3em" fontSize="24">299฿</text>
                <text x="50%" y="66%" textAnchor="middle" fill="white" strokeWidth="1px" dy=".3em" fontSize="12">{t("customer.subscription.price")}</text>
            </svg>
        );
    }

  return (
    <div className="flex justify-center bg-[#212529] p-6 sm:min-h-screen min-h-screen relative">
        <Head>
            <title>Subscription</title>
            <meta name="description" content="Customer Subscription page." />
        </Head>
        <div className="absolute top-4 right-4">
            <div className="flex gap-2">
                <Navbar />
            </div>
        </div>
        <div className="flex flex-col w-full sm:w-[1500px] min-h-screen rounded-xl py-4 px-4 gap-4">
            <div className="subscriptionHeader items-center">
                <div className="flex flex-col justify-center items-center w-full">
                    <p className="text-white font-bold text-[48px] mt-4 text-center">
                        {t("customer.subscription.title")}
                        {/* สมัครแพลนสมาชิก */}
                    </p>
                </div>
                <hr className="w-[50px] mx-auto border-gray-500" />
                <div className="flex flex-col justify-center items-center w-full">
                    <p className="text-white text-[20px] mt-4">
                        {t("customer.subscription.current")}
                        {/* ตอนนี้แพลนสมาชิกของคุณคือ */}
                        <a className="font-bold"> {plan}</a> <br/>
                    </p>
                    <p className="text-white text-[20px] mt-1">
                        {t("customer.subscription.upgrade")}
                        {/* ถ้าอยากอัพเกรดแพลน กรุณาติดต่อเราที่  */}
                        <a> </a><u>isaman@promptlabai.com</u>
                    </p>
                </div>
            </div>
            <div className="subscriptionList">
                <div className="container text-center">
                    <div className="row text-center flex justify-center gap-8 flex-wrap">
                            { /* Free */}
                            <Card className="flex-col mt-4 w-80 border-8 border-transparent hover:border-green-400" title="Subscription Card" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                <p className="text-[28px] mt-4 font-bold tracking-wider">Free</p>
                                <div className="flex justify-center">
                                    <FreeIcon />
                                </div>
                                <CardBody placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                    <ul className="flex flex-col gap-2">
                                        <li className="flex items-center gap-4">
                                            <span className="rounded-full border border-black bg-white/20 p-1">
                                            <CheckIcon />
                                            </span>
                                            <Typography className="font-normal" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                                60 {(t("customer.subscription.message"))}
                                                {/* 60 ข้อความต่อเดือน */}
                                            </Typography>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <span className="rounded-full border border-black bg-white/20 p-1">
                                            <CheckIcon />
                                            </span>
                                            <Typography className="font-normal" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                                {t("customer.subscription.support")}
                                                {/* บริการสนับสนุนผ่านชุมชน */}
                                            </Typography>
                                        </li>
                                    </ul>
                                </CardBody>
                            </Card>
                            { /* Bronze */}
                            <Card className="mt-4 w-80 border-8 border-transparent hover:border-orange-400" title="Subscription Card" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                <p className="text-[28px] mt-4 font-bold tracking-wider">Bronze</p>
                                <div className="flex justify-center">
                                    <BronzeIcon />
                                </div>
                                <CardBody placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                    <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-4">
                                            <span className="rounded-full border border-black bg-white/20 p-1">
                                            <CheckIcon />
                                            </span>
                                            <Typography className="font-normal" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                                300 {(t("customer.subscription.message"))}
                                                {/* 300 ข้อความต่อเดือน */}
                                            </Typography>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <span className="rounded-full border border-black bg-white/20 p-1">
                                            <CheckIcon />
                                            </span>
                                            <Typography className="font-normal" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                                {t("customer.subscription.support")}
                                                {/* บริการสนับสนุนผ่านชุมชน */}
                                            </Typography>
                                        </li>
                                    </ul>
                                </CardBody>
                                <CardFooter placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                    <Button className="bg-orange-400 hover:bg-orange-600" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                        {t("customer.subscription.buy")}
                                    </Button>
                                </CardFooter>
                            </Card>
                            { /* Silver */}
                            <Card className="mt-4 w-80 border-8 border-transparent hover:border-gray-400" title="Subscription Card" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                <p className="text-[28px] mt-4 font-bold tracking-wider">Silver</p>
                                <div className="flex justify-center">
                                    <SilverIcon />
                                </div>
                                <CardBody placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                    <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-4">
                                            <span className="rounded-full border border-black bg-white/20 p-1">
                                            <CheckIcon />
                                            </span>
                                            <Typography className="font-normal" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                                1500 {(t("customer.subscription.message"))}
                                                {/* 1500 ข้อความต่อเดือน */}
                                            </Typography>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <span className="rounded-full border border-black bg-white/20 p-1">
                                            <CheckIcon />
                                            </span>
                                            <Typography className="font-normal" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                                {t("customer.subscription.support")}
                                                {/* บริการสนับสนุนผ่านชุมชน */}
                                            </Typography>
                                        </li>
                                    </ul>
                                </CardBody>
                                <CardFooter placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                    <Button className="bg-gray-400 hover:bg-gray-600" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                        {t("customer.subscription.buy")}
                                    </Button>
                                </CardFooter>
                            </Card>
                            { /* Gold */}
                            <Card className="mt-4 w-80 border-8 border-transparent hover:border-yellow-400" title="Subscription Card" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                <p className="text-[28px] mt-4 font-bold tracking-wider">Gold</p>
                                <div className="flex justify-center">
                                    <GoldIcon />
                                </div>
                                <CardBody placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                    <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-4">
                                            <span className="rounded-full border border-black bg-white/20 p-1">
                                            <CheckIcon />
                                            </span>
                                            <Typography className="font-normal" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                                3000 {(t("customer.subscription.message"))}
                                                {/* 3000 ข้อความต่อเดือน */}
                                            </Typography>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <span className="rounded-full border border-black bg-white/20 p-1">
                                            <CheckIcon />
                                            </span>
                                            <Typography className="font-normal" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                                {t("customer.subscription.support")}
                                                {/* บริการสนับสนุนผ่านชุมชน */}
                                            </Typography>
                                        </li>
                                    </ul>
                                </CardBody>
                                <CardFooter placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                    <Button className="bg-yellow-400 hover:bg-yellow-600" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                                        {t("customer.subscription.buy")}
                                    </Button>
                                </CardFooter>
                            </Card>
                    </div>
                    <p className="text-green-400 text-[16px] mt-8 mb-8">
                        {t("customer.subscription.select")}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
});

export default Subscription;