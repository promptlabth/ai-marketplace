import React from "react";
import Head from 'next/head';
import Image from "next/image";
import data from "@/domain/creator/create_agent/__mock__/agent.json";
import ButtonNext from "@/components/ButtonNext";
import InputDetial from "@/components/InputDetial";
import Dropdown from "@/components/Dropdown_use_agent";
import Outputtext from "@/components/Outputtext";
// import Reverse_button from "@/components/Reverse_button"
const useAgent = () => {
  return (
    <div className="bg-[#212529] p-6 min-h-screen flex flex-col justify-center items-center">
      <Head>
        <title>Use Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex flex-col sm:w-[600px] w-full min-h-screen bg-[#33393F] rounded-xl py-4 px-4 gap-4 mb-10">
        {/* เก็บไว้เผื่อได้กลับมาใช้ */}
        {/* <Reverse_button route_path="/" /> */}
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
          <ButtonNext name_button="Generate" route_page="/customer/use_agent" />
        </div>
      </div>
    </div>
  );
}

export default useAgent;
