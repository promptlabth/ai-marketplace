import ButtonNext from "@/components/ButtonNext";
import ButtonCancle from "@/components/ButtonCancle";
import InputNameAgent from "@/components/InputNameAgent";
import ImageUpload from "@/components/ImageUpload";
import InputDetial from "@/components/InputDetial";
import Head from "next/head";
import { useGlobal } from "@/context/context";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StudioMenu from "@/components/StudioiMenu";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";

const CreateAgent = () => {
  const { setAgentDescribe } = useGlobal();

  const handleDesChangeAgentDescribe = (value: string) => {
    setAgentDescribe(value);
    console.log("setAgentDescribe", value);
  };

  return (
    <div className="bg-[#212529] p-6 flex justify-center">
      <Head>
        <title>Create Agent</title>
        <meta name="description" content="Create your AI agent" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <ButtonChangeLanguage />
          <StudioMenu/>
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-[700px] min-h-screen rounded-xl py-4 gap-4">
        <div className="flex flex-col gap-4 h-[80%]">
          <InputNameAgent name_label="ตั้งชื่อ AI ของคุณ" />
          <ImageUpload />
          <InputDetial
            detail="อธิบายเกี่ยวกับ AI ของคุณ"
            setValue={(value) => handleDesChangeAgentDescribe(value)}
            promptValues=""
          />
          <div className="flex justify-around items-center w-full h-[20%] gap-4">
            <ButtonNext name_button="ถัดไป" route_page="/creator/edit_agent" />
            <ButtonCancle name_button="ย้อนกลับ" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgent;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
