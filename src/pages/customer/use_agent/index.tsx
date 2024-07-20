import React from "react";
import Head from 'next/head';
import Image from "next/image";
import data from "@/domain/creator/create_agent/__mock__/agent.json";
import Dropdown from "@/components/DropdownUseAgent";
import Outputtext from "@/components/Outputtext";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import InputDetail from "@/components/InputDetial";
import { useGlobal } from "@/context/context";
import ButtonGenerate from "@/components/ButtonGenerate";
import { GetMessages } from "@/services/api/GetMessagesAPI";
import { useState } from "react";

const useAgent = () => {
  const { t } = useTranslation("common");
  const { user_prompt,
        setUserPrompt,
        style_message_id,
        agent,
        } = useGlobal();
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState(null);
  
  const handleGetMessages = async () => {
    const data = {
      firebase_id: "123ID",
      agent_id: agent?.ID,
      prompt: user_prompt,
      style_message_id: style_message_id,
    };
    console.log("GetMessages call", data);
    // setMessages(user_prompt);
    const result = await GetMessages( i18n.language, data);
    if(result.result) {
      console.log("GetMessages", result.result);
      setMessages(result.result);
    } else {
      console.log("err GetMessages", result.error);
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
          <Image src="/judment.svg" alt="" width={100} height={100} />
          <div className="flex justify-center flex-col p-4 gap-2">
            <p className="flex w-full justify-center text-white font-bold text-[30px]">
              {data[0].name_agent}
            </p>
            <p className="text-sm text-[#616870]">{data[0].agent_detial}</p>
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
          generate={messages ?? "..."}
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