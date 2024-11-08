import ButtonNext from "@/components/ButtonNext";
import ButtonCancle from "@/components/ButtonCancle";
import InputNameAgent from "@/components/InputNameAgent";
import ImageUpload from "@/components/ImageUpload";
import InputDetial from "@/components/InputDetial";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useGlobal } from "@/context/context";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StudioMenu from "@/components/StudioiMenu";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import { useTranslation } from "next-i18next";

const CreateAgent = () => {
  const { setAgentDescribe } = useGlobal();

  const handleDesChangeAgentDescribe = (value: string) => {
    setAgentDescribe(value);
    console.log("setAgentDescribe", value);
  };

  const { t } = useTranslation("common");

  return (
    <div className="bg-gradient-to-r from-[#02ffac] to-[#212529] p-6 flex justify-center min-h-screen">
      <Head>
        <title>Create Agent</title>
        <meta name="description" content="Create your AI agent" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <Navbar />
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-[700px] min-h-screen bg-[#33393F] rounded-xl py-4 px-6 gap-4 shadow-lg">
        <div className="flex flex-col gap-4 h-[80%]">
          <InputNameAgent name_label={t("create_agent.title.agent_name")} />
          <ImageUpload />
          <InputDetial
            detail={t("create_agent.title.detail")}
            setValue={(value) => handleDesChangeAgentDescribe(value)}
            text_placeholder={t("inputDetail.placeholder")}
          />
          <div className="flex justify-around items-center w-full h-[20%] gap-4">
            <ButtonNext
              name_button={t("create_agent.button.next")}
              route_page="/creator/edit_agent"
              className="bg-[#02ffac] text-black hover:bg-[#02e6a3] transition-all duration-200 rounded-lg px-4 py-2 shadow-md"
            />
            <ButtonCancle
              name_button={t("create_agent.button.prev")}
              className="bg-gray-600 text-white hover:bg-gray-500 transition-all duration-200 rounded-lg px-4 py-2 shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
