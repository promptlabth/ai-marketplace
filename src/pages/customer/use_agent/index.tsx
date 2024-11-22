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
import useGetFullPrompt from "@/components/hooks/GetFullPrompt"; // Import the custom hook

const useAgent = () => {
  const { t } = useTranslation("common");
  const { user_prompt, setUserPrompt, style_message_id, agent } = useGlobal();
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState(null);
  const [realTimeMessage, setRealTimeMessage] = useState("");
  const [isActive, setIsActive] = useState(false);

  const { fullPrompt, loading, error } = useGetFullPrompt(agent?.ID.toString() || ""); // Use the custom hook

  useEffect(() => {
    console.log('fullPrompt updated:', fullPrompt);
    if (fullPrompt) {
      console.log('Setting full_prompt in local storage:', fullPrompt);
      localStorage.setItem("full_prompt", fullPrompt);
    }
  }, [fullPrompt]);

  useEffect(() => {
    if (isActive) {
      console.log("Streaming is active"); // Logs when isActive becomes true
    }
  }, [isActive]);

  const handleNewCharacter = (newChar: string) => {
    setRealTimeMessage((prev) => prev + newChar);
  };

  const handleGetMessages = async () => {
    setRealTimeMessage("");
    setIsActive(true);
  
    // Check if fullPrompt is null; handle it if so
    if (!fullPrompt) {
      console.error("fullPrompt is null");
      setIsActive(false);
      return; // Return early if fullPrompt is null to avoid errors
    }
  
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const firebase_id = userData.user?.firebase_id || "null";
  
    // Replace `[user_input]` in `fullPrompt` with `user_prompt`
    const filledPrompt = fullPrompt.replace("[user_input]", user_prompt);
  
    const data = {
      firebase_id: firebase_id|| "Test",
      agent_id: agent?.ID || 0,
      prompt: filledPrompt, // Send the modified prompt here
      style_message_id,
    };
  
    try {
      await GetMessages(i18n.language, data, handleNewCharacter);
    } finally {
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
        <div className="flex flex-col justify-center items-center w-full">
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
