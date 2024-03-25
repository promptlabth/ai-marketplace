import ButtonNext from "@/components/ButtonNext"
import ButtonCancle from "@/components/ButtonCancle"
import InputNameAgent from "@/components/InputNameAgent";
import ImageUpload from "@/components/ImageUpload";
import InputDetial from "@/components/InputDetial"
import Head from 'next/head';
import data from "@/domain/creator/create_agent/__mock__/agent.json"
import Image from "next/image";
import React from "react";
import Dropdown from "@/components/Dropdown_use_agent";
import Outputtext from "@/components/Outputtext";

const useAgent = () => {
  return (
    <div className="bg-[#212529] p-6 min-h-screen">
      <Head>
        <title>Prompt Marketplace</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex flex-col w-full min-h-screen bg-[#33393F] rounded-xl py-4 px-4 gap-4">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Image src="/judment.svg" alt="" width={100} height={100} />
          <div className="flex justify-center flex-col p-4 gap-2">
            <p className="flex w-full justify-center text-white font-bold text-[30px]">{data[0].name_agent}</p>
            <p className="text-sm text-[#616870]">{data[0].agent_detial}</p>
          </div>
        </div>
        <InputDetial detail={data[0].input_label} />
        <Dropdown content="สไตล์ข้อความ" />
        <Outputtext content="ข้อความที่ได้" generate="..." />
        <div className="flex justify-around items-center w-full gap-4 pt-4">
          <ButtonNext name_button="สร้าง" route_page="/customer/use_agent" />
          <ButtonCancle name_button="ย้อนกลับ" />
        </div>
      </div>
    </div>
  );
}

export default useAgent;