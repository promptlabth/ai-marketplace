import React, { useState } from 'react';
import CarouselMarketplace from "@/components/CorouselMarketplace";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ButtonLogin from "@/components/ButtonLogin";
import LoginModal from '@/components/LoginModal';

export default function Home() {
  const { t } = useTranslation("common");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center flex-col bg-[#212529] min-h-screen p-6">
      <Head>
        <title>Prompt Marketplace</title>
        <meta name="description" content="" />
      </Head>
      <div className="absolute top-4 right-32">
        <div className="flex gap-2">
          <ButtonChangeLanguage />
        </div>
      </div>
      <div className="absolute top-4 right-8">
        <div className="flex gap-2">
          <ButtonLogin onClick={openModal}/>
        </div>
      </div>
      {isModalOpen && <LoginModal onClose={closeModal} />}
      <div className="flex items-center flex-col bg-[#212529] h-full mb-16">
        <div className="flex flex-col items-center justify-center pt-12 animate-fade-down">
          <h1 className="font-extrabold  text-[30px] bg-clip-text text-transparent bg-gradient-to-r from-[#02F6A9] to-[#0DC19A] ">
            Prompt Lab
          </h1>
          <h1 className="font-extrabold  text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-[#02F6A9] to-[#0DC19A]">
            AI Marketplace
          </h1>
          <p className="text-white text-center">{t("home.title.sub.head")}</p>
        </div>
        <div className="flex flex-col items-start mt-12 sm:w-[600px] gap-8">
          <div className="mt-8">
            <p className=" text-white font-bold">{t("home.title.carousel")}</p>
            <div className="w-full h-[300px] rounded-xl flex justify-center ">
              <CarouselMarketplace />
            </div>
            <div className="py-4">
              <h1 className="text-white font-bold text-lg">
                {t("home.title.customer")}
              </h1>
              <div className="text-white">
                <p>
                  {t("home.title.customer.step1")}{" "}
                  <strong>{t("home.title.customer.step1.strong")}</strong>
                </p>
                <p>{t("home.title.customer.step2")}</p>
                <p>
                  {t("home.title.customer.step3")}{" "}
                  <strong>{t("home.title.customer.step1.strong")}</strong>{" "}
                  {t("home.title.customer.step1.tail")}
                </p>
                <p>
                  {t("home.title.customer.step4")}{" "}
                  <strong>{t("home.title.customer.step4.strong")}</strong>
                </p>
                <p>
                  {t("home.title.customer.step5")}
                  <Link href="/customer/marketplace" className="underline">
                    <strong> {t("home.title.customer.step5.link")}</strong>
                  </Link>
                </p>
              </div>
            </div>
            <div className="py-8">
              <h1 className="text-white font-bold text-lg">
                {t("home.title.creator")}
              </h1>
              <div className="text-white">
                <p>
                  {t("home.title.creator.step1")}{" "}
                  <strong>{t("home.title.creator.step1.strong")}</strong>
                </p>
                <p>{t("home.title.creator.step2")}</p>
                <p>{t("home.title.creator.step3")}</p>
                <p>{t("home.title.creator.step4")}</p>
                <p>
                  {t("home.title.creator.step5")}
                  <Link href="/creator/create_agent" className="underline">
                    <strong> {t("home.title.creator.step5.link")}</strong>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
