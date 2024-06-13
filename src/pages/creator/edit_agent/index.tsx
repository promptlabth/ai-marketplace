import ButtonCancle from "@/components/ButtonCancle";
import Framework from "@/components/Framework";
import Head from "next/head";
import React from "react";
import { useRouter } from 'next/navigation';
import { useGlobal } from "@/context/context";
import { CreatePostAgent } from "@/services/api/AgentAPI";
import { useTranslation } from 'next-i18next'
import StudioMenu from "@/components/StudioiMenu";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage"


const EditAgent = () => {
  const {
    agent_name,
    agent_image,
    agent_describe,
    prompt,
    role_framework_id,
    framework_id,
  } = useGlobal();

  const { t } = useTranslation('common')

  const router = useRouter();
  console.log(">> agent_describe", agent_describe);
  const handleCreateAgent = async () => {
    const agentDetails = {
      name: agent_name,
      description: agent_describe,
      image_url: agent_image,
      prompt: prompt,
      user_id: "u123",
      framework_id: framework_id,
      role_framework_id: role_framework_id,
    };
    console.log("AgentDetails", agentDetails);

    const result = await CreatePostAgent(agentDetails);

    if (result.status === "success") {
      console.log(result);
      router.push("/creator/list_agent");
    } else {
      console.log("CreateAgent", result);
    }
  };

  return (
    <div className="bg-[#212529] p-4 min-h-screen flex justify-center items-center">
      <Head>
        <title>Edit Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <ButtonChangeLanguage />
          <StudioMenu />
        </div>
      </div>
      <div className="flex flex-col w-full min-h-screen sm:w-[650px] bg-[#33393F] rounded-xl gap-2 mb-12">
        <div className="gap-2 p-2">
          <Framework />
          <div className="flex justify-around items-center w-full gap-2 pt-2">
            <button
              onClick={handleCreateAgent}
              className="flex-auto hover:bg-[#03FFAB] hover:text-white focus:bg-[#03FFAB] sm:text-[17px] sm:font-bold focus:text-black h-[40px] w-full ring-2 ring-[#03FFAB] ring-inset rounded-full text-[12px] text-[#03FFAB]"
            >
              สร้าง
            </button>
            <ButtonCancle name_button="ย้อนกลับ" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAgent;


export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
