import React from "react";
import Head from 'next/head';
import Image from "next/image";
import data from "@/domain/creator/create_agent/__mock__/agent.json";
import ButtonNext from "@/components/ButtonNext";
import Dropdown from "@/components/DropdownUseAgent";
import Outputtext from "@/components/Outputtext";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import InputDetail from "@/components/InputDetial";
import { useGlobal } from "@/context/context";
// import Reverse_button from "@/components/Reverse_button"
const useAgent = () => {
  const { t } = useTranslation("common");
  const { user_prompt, setUserPrompt } = useGlobal();
  // console.log("user_prompt", user_prompt);
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
          detail={"ถามคำถามเกี่ยวกับกฏหมาย"}
          setValue={(value)=>{setUserPrompt(value)}}
        />
        <Dropdown
          content={t("customer.useAgent.Dropdown.name")}
          placeholder={t("customer.useAgent.Dropdown.placeholder")}
        />
        <Outputtext
          content={t("customer.useAgent.Outputtext.name")}
          generate="..."
        />
        <div className="flex justify-around items-center w-full gap-4 pt-4">
          <ButtonNext
            name_button={t("customer.useAgent.button.name")}
            route_page="/customer/use_agent"
          />
        </div>
      </div>
    </div>
  );
}

export default useAgent;


export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});