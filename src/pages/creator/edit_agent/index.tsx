import ButtonNext from "@/components/ButtonNext"
import ButtonCancle from "@/components/ButtonCancle"
import InputDetial from "@/components/InputDetial"
import Framework from "@/components/Framework";
import Head from 'next/head';
import React from "react";

const EditAgent = () => {



  return (
    <div className="bg-[#212529] p-4">
      <Head>
        <title>Prompt Marketplace</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex flex-col w-full h-screen bg-[#33393F] rounded-xl py-2 gap-4">
        <div className="gap-4 h-[90%] p-4">
          <Framework />
        </div>
        <div className="flex justify-around items-center w-full h-[10%] gap-4 px-6">
          <ButtonNext name_button="ถัดไป" />
          <ButtonCancle name_button="ย้อนกลับ" />
        </div>
      </div>
    </div>
  );
}

export default EditAgent;