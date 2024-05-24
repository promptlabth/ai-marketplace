import ButtonCancle from "@/components/ButtonCancle";
import Framework from "@/components/Framework";
import Head from "next/head";
import React from "react";
import CreatorLayout from "../CreatorLayout";
import { useRouter } from 'next/navigation';
import { useGlobal } from "@/context/context";
import axios from "axios";
import { useState } from "react";

const EditAgent = () => {
  const { agent_name, agent_describe, agent_image } = useGlobal();
  const [image_url, setImageUrl] = useState<string>("")

  const UploadImage = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/upload/`, agent_image, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
      if(response.status === 201) {
        setImageUrl(response.data.url)
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  const router = useRouter();
  const CreateAgent = () => {
    UploadImage();
    // router.push("/creator/list_agent")
  }

  return (
    <CreatorLayout>
      <div className="bg-[#212529] p-4 min-h-screen flex justify-center items-center">
        <Head>
          <title>Edit Agent</title>
          <meta name="description" content="" />
        </Head>
        <div className="flex flex-col w-full min-h-screen sm:w-[650px] bg-[#33393F] rounded-xl gap-2 mb-12">
          <div className="gap-2 p-2">
            {/* <p>{agent_name}</p>
            <p>{agent_describe}</p> */}
            <Framework />
            <div className="flex justify-around items-center w-full gap-2 pt-2">
              <button onClick={CreateAgent} className="flex-auto hover:bg-[#03FFAB] hover:text-white focus:bg-[#03FFAB] sm:text-[17px] sm:font-bold focus:text-black h-[40px] w-full ring-2 ring-[#03FFAB] ring-inset rounded-full text-[12px] text-[#03FFAB]">สร้าง</button>
              <ButtonCancle name_button="ย้อนกลับ" />
            </div>
          </div>
        </div>
      </div>
    </CreatorLayout>
  );
};

export default EditAgent;
