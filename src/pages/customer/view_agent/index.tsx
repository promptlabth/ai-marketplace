import React from "react";
import Head from 'next/head';
import Image from "next/image";
import data from "@/domain/customer/marketplace/__mock__/view_agent.json";
import ButtonNext from "@/components/ButtonNext";
import Reverse_button from "@/components/Reverse_button"

const AgentView = () => {
  return (
    <div className="bg-[#212529] p-6 min-h-screen flex justify-center">
      <Head>
        <title>View Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex flex-col justify-between sm:w-[600px] min-h-screen bg-[#33393F] rounded-xl py-4 px-4 gap-4">
        <Reverse_button route_path="/" />
        <div className="flex flex-col gap-12">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <Image src="/judment.svg" alt="" width={100} height={100} />
            <p className="flex w-full justify-center text-white font-bold text-[30px]">{data.name_ai}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex text-[#03FCA9]">AI Type:<p className="px-2 text-white">{data.ai_type}</p></div>
            <div className="flex text-[#03FCA9] border-b-[1px]">Framwork:<p className="px-2  text-white">{data.framework}</p></div>
            <div className="flex flex-col text-[#03FCA9] mt-8">อธิบาย AI:<p className="text-white">{data.detail_ai}</p></div>
            <div className="flex flex-col text-[#03FCA9] mt-8">อธิบาย Framwork:<p className="text-white">{data.framwork_detail}</p></div>
          </div>
        </div>
        <div className="flex justify-around items-end w-full gap-4">
          <ButtonNext name_button="Use AI" route_page="/customer/use_agent" />
        </div>
      </div>
    </div >
  );
}

export default AgentView;
