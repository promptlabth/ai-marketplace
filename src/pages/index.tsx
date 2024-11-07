import React, { useState } from "react";
import CarouselMarketplace from "@/components/CorouselMarketplace";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ButtonLogin from "@/components/ButtonLogin";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const { t } = useTranslation("common");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen">
      <Head>
        <title>Prompt Marketplace</title>
        <meta name="description" content="" />
      </Head>


      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover filter blur-md grayscale-[50%] z-0"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      

      <div className="absolute inset-0 bg-gray-800 opacity-50 z-0"></div>

      
      <div className="relative z-0 flex items-center flex-col min-h-screen p-6">
        {/* <div className="absolute top-4 right-32">
          <div className="flex gap-2">
            <ButtonChangeLanguage />
          </div>
        </div>
        <div className="absolute top-4 right-8">
          <div className="flex gap-2">
            <ButtonLogin onClick={openModal} />
          </div>
        </div>
        {isModalOpen && <LoginModal onClose={closeModal} />} */}
        <div className="flex items-center flex-col h-full mb-16">
        <Navbar />
          <div className="flex flex-col items-center justify-center pt-12 animate-fade-down">
            <h1 className="font-extrabold text-[30px] bg-clip-text text-transparent bg-gradient-to-r from-[#02F6A9] to-[#0DC19A] animate-fly">
              Prompt Lab
            </h1>
            <h1 className="font-extrabold text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-[#02F6A9] to-[#0DC19A] animate-fly">
              AI Marketplace
            </h1>
            
            <p className="text-white text-center">{t("home.title.sub.head")}</p>
          </div>
          <div className="flex flex-col items-start mt-12 sm:w-[600px] gap-8 z-[-1]">
            <div className="mt-8">
              <div className="w-full h-[300px] rounded-xl flex justify-center scroll-container">
                <CarouselMarketplace />
              </div>
              <div className="mt-8 space-y-16">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
                  <h1 className="text-white font-bold text-2xl mb-4">
                    {t("home.title.customer")}
                  </h1>
                  <div className="text-white space-y-4">
                    <p>
                      {t("home.title.customer.step1")}{" "}
                      <strong style={{ color: "#00FFAB" }}>
                        {t("home.title.customer.step1.strong")}
                      </strong>
                    </p>
                    <p>{t("home.title.customer.step2")}</p>
                    <p>
                      {t("home.title.customer.step3")}{" "}
                      <strong style={{ color: "#00FFAB" }}>
                        {t("home.title.customer.step3.strong")}
                      </strong>{" "}
                    </p>
                    <p>
                      {t("home.title.customer.step4")}{" "}
                      <strong style={{ color: "#00FFAB" }}>
                        {t("home.title.customer.step4.strong")}
                      </strong>
                    </p>
                    <p>
                      {t("home.title.customer.step5")}
                      <Link
                        href="/customer/marketplace"
                        className="underline"
                        style={{ textDecorationColor: "#00FFAB" }}
                      >
                        <strong style={{ color: "#00FFAB" }}>
                          {t("home.title.customer.step5.link")}
                        </strong>
                      </Link>
                    </p>

                    {/* Video Section for Tutorial */}
                    <div className="mt-8">
                      <h2 className="text-white font-bold text-xl mb-4">
                        {t("home.title.customer.tutorial")}
                      </h2>
                      <div className="relative w-full h-0 pb-[56.25%]">
                        {" "}
                        {/* 16:9 Aspect Ratio */}
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src="/videos/How To Use AI.mp4"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
                  <h1 className="text-white font-bold text-2xl mb-4">
                    {t("home.title.creator")}
                  </h1>
                  <div className="text-white space-y-4">
                    <p>
                      {t("home.title.creator.step1")}{" "}
                      <strong style={{ color: "#00FFAB" }}>
                        {t("home.title.creator.step1.strong")}
                      </strong>
                    </p>
                    <p>{t("home.title.creator.step2")}</p>
                    <p>{t("home.title.creator.step3")}</p>
                    <p>{t("home.title.creator.step4")}</p>
                    <p>
                      {t("home.title.creator.step5")}
                      <Link
                        href="/creator/create_agent"
                        className="underline"
                        style={{ textDecorationColor: "#00FFAB" }}
                      >
                        <strong style={{ color: "#00FFAB" }}>
                          {t("home.title.creator.step5.link")}
                        </strong>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Explicitly typing the `locale` parameter as a string
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
