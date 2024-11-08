import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Dropdown from "@/components/DropdownUseAgent";
import Outputtext from "@/components/Outputtext";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import InputDetail from "@/components/InputDetial";
import { useGlobal } from "@/context/context";
import ButtonGenerate from "@/components/ButtonGenerate";
import { GetMessages } from "@/services/api/GetMessagesAPI";

const useAgent = () => {
  const { t } = useTranslation("common");
  const { user_prompt, setUserPrompt, style_message_id, agent } = useGlobal();
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState(null);
  const [realTimeMessage, setRealTimeMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      console.log("Streaming is active"); // Logs when isActive becomes true
    }
  }, [isActive]);

  const handleNewCharacter = (newChar: string) => {
      setRealTimeMessage((prev) => prev + newChar);
  };


  const handleGetMessages = async () => {

    // Clear previous message and set the request as active immediately
    setRealTimeMessage("");
    setIsActive(true);
    

    // Prepare data for the request
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const firebase_id = userData.user?.firebase_id || "null";
    const data = {
      firebase_id: localStorage.getItem("firebase_id") || "Test",
      agent_id: agent?.ID || 0,
      prompt: user_prompt,
      style_message_id,
    };

    // Call GetMessages and update the realTimeMessage with each character received
    try {
      await GetMessages( i18n.language, data, handleNewCharacter);
    } finally {
      // Set isActive to false once the request is complete
      setIsActive(false);
    }
  };

  return (
    <div className="bg-[#212529] p-6 min-h-screen flex flex-col justify-center items-center">
      <Head>
        <title>{t("customer.useAgent.title")}</title>
        <meta name="description" content="" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <ButtonChangeLanguage />
        </div>
      </div>
      <div className="flex flex-col sm:w-[600px] w-full min-h-screen bg-[#33393F] rounded-xl py-4 px-4 gap-4 mb-10">
        {/* เก็บไว้เผื่อได้กลับมาใช้ */}
        {/* <Reverse_button route_path="/" /> */}
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="flex flex-col overflow-hidden rounded-full relative w-20 h-20 justify-center items-center">
            {agent?.ImageURL && <Image src={agent.ImageURL} alt="" width={100} height={100} />}
          </div>
          <div className="flex justify-center flex-col p-4 gap-2">
            <p className="flex w-full justify-center text-white font-bold text-[30px]">
              {agent?.Name}
            </p>
            {agent?.Description && <p className="text-sm text-[#616870]">{agent.Description}</p>}
          </div>
        </div>

        <InputDetail
          detail={t("customer.useAgent.InputDetail.name")}
          setValue={(value) => {
            setUserPrompt(value);
          }}
          text_placeholder={t("inputDetail.placeholder")}
        />
        <Dropdown
          content={t("customer.useAgent.Dropdown.name")}
          placeholder={t("customer.useAgent.Dropdown.placeholder")}
        />
        <Outputtext
          content={t("customer.useAgent.Outputtext.name")}
          generate={realTimeMessage ?? "..."}
        />
        <div className="flex justify-around items-center w-full gap-4 pt-4">
          <ButtonGenerate
            name_button={t("customer.useAgent.button.name")}
            handleGenerate={() => {
              handleGetMessages();
            }}
          // route_page="/customer/use_agent"
          />
        </div>
      </div>
    </div>
  );
};

export default useAgent;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
