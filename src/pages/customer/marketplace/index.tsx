import SearchInput from "@/components/SearchInput";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import useAgents from "@/services/api/GetAgents";
import GetRole from "@/services/api/GetRole";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";

const CreateAgent = () => {
  const { data, isLoading, error } = useAgents();
  const [clickOpencategory, setOpencategory] = useState<string>("flex-nowrap");
  const [filteredAgents, setFilteredAgents] = useState<any[]>([]);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [allRoles, setAllRoles] = useState<any[]>([]);

  useEffect(() => {
    if (data?.agents) {
      setFilteredAgents(data.agents);
      const uniqueRoles = Array.from(new Set(data.agents.map((agent: any) => agent.RoleFrameID)));
      setAllRoles(uniqueRoles);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Loading />;
  }

  const groupedAgents = filteredAgents.reduce((acc: any, agent: any) => {
    if (!acc[agent.RoleFrameID]) {
      acc[agent.RoleFrameID] = [];
    }
    acc[agent.RoleFrameID].push(agent);
    return acc;
  }, {});

  const handleCategoryClick = (roleFrameID: number) => {
    const newFilteredAgents = data.agents.filter((agent: any) => {
      const agentRoleFrameID = Number(agent.RoleFrameID);
      const comparedRoleFrameID = Number(roleFrameID);
      console.log(`Agent ID: ${agent.ID}, Agent RoleFrameID: ${agentRoleFrameID}, Compared RoleFrameID: ${comparedRoleFrameID}`);
      return agentRoleFrameID === comparedRoleFrameID;
    });
    setFilteredAgents(newFilteredAgents);
  };


  const handleSearch = (searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase();
    const newFilteredAgents = data.agents.filter(
      (agent: any) =>
        agent.Name.toLowerCase().includes(searchLower)
    );
    setFilteredAgents(newFilteredAgents);
  };

  return (
    <div className="bg-[#212529] h-screen overflow-y-auto p-6">
      <Head>
        <title>Marketplace Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex justify-center w-full flex-col items-center mb-12">
        <div className="flex flex-start w-full sm:w-[750px] mt-6">
          <SearchInput
            name_label="ค้นหา AI ของคุณ"
            placeholder="Search"
            invisible=""
            onSearch={handleSearch}
          />
        </div>
        <div
          className={`flex items-center w-full sm:w-[750px] mt-4 gap-4 ${clickOpencategory} overflow-x-auto scroll-container`}
        >
          {allRoles.map((roleFrameID: number, index: number) => (
            <RoleButton
              key={index}
              roleFrameID={roleFrameID}
              onClick={handleCategoryClick}
            />
            // <p key={index}>{roleFrameID}</p>
          ))}
        </div>

        <div className="flex justify-end w-full sm:w-[750px]">
          <button
            onClick={() =>
              setOpencategory((current) =>
                current === "flex-nowrap" ? "flex-wrap" : "flex-nowrap"
              )
            }
            className="text-white underline focus:text-gray-300 hover:text-gray-300 mt-4"
          >
            ดูเพิ่มเติม
          </button>
        </div>
        <div className="flex flex-col flex-initial w-full sm:w-[750px] items-center mt-4 gap-12">
          {Object.keys(groupedAgents).map((roleFrameID: any) => (
            <div
              key={roleFrameID}
              ref={(el) => (categoryRefs.current[roleFrameID] = el)}
              className="flex flex-col sm:items-start gap-4 mb-4 w-full snap-x snap-mandatory hide-scrollbar overflow-x-scroll space-x-4"
            >
              <RoleCategory roleFrameID={roleFrameID} agents={groupedAgents[roleFrameID]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RoleButton = ({
  roleFrameID,
  onClick,
}: {
  roleFrameID: number;
  onClick: (roleFrameID: number) => void;
}) => {
  const { roleName, isLoading, error } = GetRole(roleFrameID);
  if (isLoading) return null;
  if (error) return null;

  return (
    <button
      onClick={() => onClick(roleFrameID)}
      className="flex-none p-2 border-2 border-[#03FFAB] w-fit h-fit rounded hover:bg-[#03FFAB] focus:bg-[#03FFAB] text-sm text-[#03FFAB] focus:text-black hover:text-black scroll-item"
    >
      {roleName}
    </button>
  );
};

const RoleCategory = ({ roleFrameID, agents }: { roleFrameID: number, agents: any[] }) => {
  const { roleName, isLoading, error } = GetRole(roleFrameID);

  if (isLoading) return null;
  if (error) return null;

  return (
    <>
      <h3 className="text-lg font-bold text-white w-full justify-start">{roleName}</h3>
      <div className="flex gap-4">
        {agents.map((agent: any) => (
          <Link
            key={agent.ID}
            href={`/customer/${agent.ID}`}
            className="flex items-center flex-col relative flex-none rounded-[30px] w-[170px] h-[300px] p-2 bg-[#697179]"
          >
            <div className="flex items-center overflow-hidden justify-center w-[100px] h-[100px] border-2 rounded-full bg-gray-800 relative">
              {agent.ImageURL ? (
                <Image
                  src={agent.ImageURL}
                  alt="Agent image"
                  layout="fill"
                  className="object-cover"
                />
              ) : (
                <p>Image not available</p>
              )}
            </div>
            <p className="text-[#FFFFFF] font-bold text-[16px] mt-4">
              {agent.Name}
            </p>
            <article className="text-[#FFFFFF] text-[14px] mt-2 w-full text-wrap break-words">
              <p>{agent.Description}</p>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CreateAgent;
