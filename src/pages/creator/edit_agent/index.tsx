import ButtonNext from "@/components/ButtonNext";
import ButtonCancle from "@/components/ButtonCancle";
import Framework from "@/components/Framework";
import Head from "next/head";
import React from "react";
import CreatorLayout from "../CreatorLayout";

const EditAgent = () => {
  return (
    <CreatorLayout>
      <div className="bg-[#212529] p-4 min-h-screen flex justify-center items-center">
        <Head>
          <title>Edit Agent</title>
          <meta name="description" content="" />
        </Head>
        <div className="flex flex-col w-full min-h-screen sm:w-[650px] bg-[#33393F] rounded-xl gap-2 mb-12">
          <div className="gap-2 p-2">
            <Framework />
            <div className="flex justify-around items-center w-full gap-2 pt-2">
              <ButtonNext
                name_button="สร้าง"
                route_page="/creator/list_agent"
              />
              <ButtonCancle name_button="ย้อนกลับ" />
            </div>
          </div>
        </div>
      </div>
    </CreatorLayout>
  );
};

export default EditAgent;
