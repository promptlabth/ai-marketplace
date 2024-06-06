import SearchInput from "@/components/SearchInput";
import { useState, useRef } from "react";
import Head from "next/head";
import useAgents from "@/services/api/GetAgents";
import GetRole from "@/services/api/GetRole";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";

const CreateAgent = () => {
  const { data, isLoading, error } = useAgents();
  const [clickOpencategory, setOpencategory] = useState<string>("flex-nowrap");
  
  const agentRefs = useRef<{
    [key: string]: HTMLAnchorElement | null;
  }>({});
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});


  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Fetch Data error</div>;
  }

  if (!data || !Array.isArray(data.agents)) {
    return <div>Invalid data format</div>;
  }


  const groupedAgents = data.agents.reduce((acc: any, agent: any) => {
    if (!acc[agent.RoleFrameID]) {
      acc[agent.RoleFrameID] = [];
    }
    acc[agent.RoleFrameID].push(agent);
    return acc;
  }, {});


  const handleCategoryClick = (roleFrameID: number) => {
    if (categoryRefs.current[roleFrameID]) {
      categoryRefs?.current[roleFrameID]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase();
    const agent = data?.agents?.find((agent: any) => agent.Name.toLowerCase().includes(searchLower));
    if (agent && agentRefs.current[agent.ID]) {
      agentRefs.current[agent.ID]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#212529] h-screen overflow-y-auto p-6">
      <Head>
        <title>Marketplace Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex justify-center w-full flex-col items-center mb-12">
        <div className="flex flex-start w-full sm:w-[750px] mt-6">
          <SearchInput name_label="ค้นหา AI ของคุณ" placeholder="Search" invisible="" onSearch={handleSearch} />
        </div>
        <div className={`flex items-center w-full sm:w-[750px] mt-4 gap-4 ${clickOpencategory} overflow-x-auto`}>
          {Object.keys(groupedAgents).map((roleFrameID: any, index: number) => (
            <RoleButton key={index} roleFrameID={roleFrameID} onClick={handleCategoryClick} />
          ))}
        </div>
        <div className="flex justify-end w-full sm:w-[750px]">
          <button
            onClick={() => setOpencategory(current => (current === "flex-nowrap" ? "flex-wrap" : "flex-nowrap"))}
            className="text-white underline focus:text-gray-300 hover:text-gray-300 mt-4"
          >
            ดูเพิ่มเติม
          </button>
        </div>
        <div className="flex flex-col flex-initial w-full sm:w-[750px] items-center mt-4 gap-12">
          {Object.keys(groupedAgents).map((roleFrameID: any) => (
            <div
              key={roleFrameID}
              ref={el => (categoryRefs.current[roleFrameID] = el)}
              className="flex flex-col sm:items-start gap-4 mb-4 w-full snap-x snap-mandatory hide-scrollbar overflow-x-scroll space-x-4"
            >
              <RoleCategory roleFrameID={roleFrameID} />
              <div className="flex gap-4">
                {groupedAgents[roleFrameID]?.map((agent: any) => (
                  <Link
                    key={agent.ID}
                    ref={el => (agentRefs.current[agent.ID] = el)}
                    href={`/customer/${agent.ID}`}
                    className="flex items-center flex-col relative flex-none rounded-[30px] w-[170px] h-[300px] p-2 bg-[#697179]"
                  >
                    <div className="flex items-center overflow-hidden justify-center w-[100px] h-[100px] border-2 rounded-full bg-gray-800 relative">
                      {agent.ImageURL ? (
                        <Image src={agent.ImageURL} alt="Agent image" layout="fill" className="object-cover" />
                      ) : (
                        <p>Image not available</p>
                      )}
                    </div>
                    <p className="text-[#FFFFFF] font-bold text-[16px] mt-4">{agent.Name}</p>
                    <article className="text-[#FFFFFF] text-[14px] mt-2 w-full text-wrap break-words">
                      <p>{agent.Description}</p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const RoleButton = ({ roleFrameID, onClick }: { roleFrameID: number, onClick: (roleFrameID: number) => void }) => {
  const { roleID, isLoading, error } = GetRole(roleFrameID);

  if (isLoading) return null;
  if (error) return null;

  return (
    <button
      onClick={() => onClick(roleFrameID)}
      className="flex-none p-2 border-2 border-[#03FFAB] w-fit h-fit rounded hover:bg-[#03FFAB] focus:bg-[#03FFAB] text-sm text-[#03FFAB] focus:text-black hover:text-black"
    >
      {roleID}
    </button>
  );
};

const RoleCategory = ({ roleFrameID }: { roleFrameID: number }) => {
  const { roleID, isLoading, error } = GetRole(roleFrameID);

  if (isLoading) return null;
  if (error) return null;

  return (
    <h3 className="text-lg font-bold text-white w-full justify-start">{roleID}</h3>
  );
};

export default CreateAgent;
