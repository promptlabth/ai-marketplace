import ButtonCancle from "@/components/ButtonCancle";
import Framework from "@/components/Framework";
import Head from "next/head";
import React from "react";
import CreatorLayout from "../CreatorLayout";
import { useRouter } from 'next/navigation';
import { useGlobal } from "@/context/context";
import { apiPostAgent } from "@/services/api/AgentAPI";

const EditAgent = () => {
  const {
    agent_name,
    agent_image,
    agent_describe,
    prompt,
    role_framework_id,
    framework_id,
  } = useGlobal();


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

  const result = await apiPostAgent(agentDetails);

  if (result.status === "success") {
    console.log(result);
    router.push("/creator/list_agent");
  } else {
    console.log("CreateAgent", result);
  }
  };

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
              <button
                onClick={ handleCreateAgent}
                className="flex-auto hover:bg-[#03FFAB] hover:text-white focus:bg-[#03FFAB] sm:text-[17px] sm:font-bold focus:text-black h-[40px] w-full ring-2 ring-[#03FFAB] ring-inset rounded-full text-[12px] text-[#03FFAB]"
              >
                สร้าง
              </button>
              <ButtonCancle name_button="ย้อนกลับ" />
            </div>
          </div>
        </div>
      </div>
    </CreatorLayout>
  );
};

export default EditAgent;
