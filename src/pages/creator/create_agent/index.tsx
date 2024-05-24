import ButtonNext from "@/components/ButtonNext";
import ButtonCancle from "@/components/ButtonCancle";
import InputNameAgent from "@/components/InputNameAgent";
import ImageUpload from "@/components/ImageUpload";
import InputDetial from "@/components/InputDetial";
import Head from "next/head";
import CreatorLayout from "../CreatorLayout";
import { useGlobal } from "@/context/context";
import { ChangeEvent } from "react";

const CreateAgent = () => {
  const { setAgentDescribe } = useGlobal();

  const handleDesChangeAgentDescribe = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAgentDescribe(e.target.value);
  };


  return (
    <CreatorLayout>
      <div className="bg-[#212529] p-6 flex justify-center">
        <Head>
          <title>Create Agent</title>
          <meta name="description" content="Create your AI agent" />
        </Head>
        <div className="flex flex-col w-full sm:w-[700px] min-h-screen rounded-xl py-4 gap-4">
          <div className="flex flex-col gap-4 h-[80%]">
            <InputNameAgent name_label="ตั้งชื่อ AI ของคุณ" />
            <ImageUpload />
            <InputDetial detail="อธิบายเกี่ยวกับ AI ของคุณ" setValue={() => handleDesChangeAgentDescribe} />
            <div className="flex justify-around items-center w-full h-[20%] gap-4">
              <ButtonNext name_button="ถัดไป" route_page="/creator/edit_agent" />
              <ButtonCancle name_button="ย้อนกลับ" />
            </div>
          </div>
        </div>
      </div>
    </CreatorLayout>
  );
};

export default CreateAgent;
