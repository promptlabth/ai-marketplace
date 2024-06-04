import React, { useEffect } from "react";
import Head from 'next/head';
import Image from "next/image";
// import data from "@/domain/customer/marketplace/__mock__/view_agent.json";
import ButtonNext from "@/components/ButtonNext";
import useGetAgent from "@/services/api/GetAgentID";
import useGetRole from "@/services/api/GetRole";
import { useRouter } from "next/router";
import useGetFramework from "@/services/api/GetFramework";
import Loading from "@/components/Loading";
const AgentView = () => {
  const router = useRouter();
  const { view_agentID } = router.query;

  const { data, isLoading, error } = useGetAgent(Number(view_agentID));

  useEffect(() => {
    console.log("Agent data:", data);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Fetch Data error</div>;
  }

  return (
    <div className="bg-[#212529] p-6 min-h-screen flex justify-center">
      <Head>
        <title>View Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex flex-col justify-between sm:w-[600px] h-full bg-[#33393F] rounded-xl py-4 px-4 gap-4 mb-10">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col overflow-hidden rounded-full relative w-20 h-20 justify-center items-center">
                {data?.agent?.ImageURL ? (
                  <Image src={data.agent.ImageURL} alt="Agent image" layout="fill" className="object-cover" />
                ) : (
                  <p>Image not available</p>
                )}
                <p className="flex w-full justify-center text-white font-bold text-[30px]">{data?.agent?.Name}</p>
              </div>
            </div>
            <p className="flex w-full justify-center text-white font-bold text-[30px]">{data?.agent?.Name}</p>
          </div>
          <div className="flex flex-col">
            <RoleCategory roleFrameID={data?.agent?.RoleFrameID || 0} />
            <FrameworkDetail FrameworkID={data?.agent?.FrameworkID || 0} />
            <div className="flex flex-col text-[#03FCA9] mt-8">อธิบาย AI:<p className="text-white">{data?.agent?.Description}</p></div>
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


const RoleCategory = ({ roleFrameID }: { roleFrameID: number }) => {
  const { roleID, isLoading, error } = useGetRole(roleFrameID);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading role data</div>;

  return (
    <div className="flex text-[#03FCA9]">AI Type:<p className="px-2 text-white">{roleID}</p></div>
  );
};


const FrameworkDetail = ({ FrameworkID }: { FrameworkID: number }) => {
  const { data, isLoading, error } = useGetFramework(FrameworkID);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading framework data</div>;

  return (
    <>
      <div className="flex text-[#03FCA9] border-b-[1px]">Framwork:<p className="px-2  text-white">{data?.framework?.Name}</p></div>
      <div className="flex flex-col text-[#03FCA9] mt-8">อธิบาย Framwork:<p className="text-white">{data?.framework?.Detail}</p></div>
    </>
  );
};