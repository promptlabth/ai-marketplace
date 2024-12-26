import SearchInput from "@/components/SearchInput";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import useAgents from "@/services/api/GetAgents";
import GetRole from "@/services/api/GetRole";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Loading from "@/components/Loading";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import RoleButton from "@/components/marketplace/RoleButton";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const CreateAgent = () => {
  const { t } = useTranslation("common");
  const [language, setLanguage] = useState<string>("th");
  const { data, isLoading, error } = useAgents(language);
  const [clickOpencategory, setOpencategory] = useState<string>("flex-nowrap");
  const [filteredAgents, setFilteredAgents] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [allRoles, setAllRoles] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredAgents(data);
      const uniqueRoles = Array.from(
        new Set(data.map((agent: any) => agent.RoleFrameID))
      );
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
    if (selectedCategory === roleFrameID) {
      setFilteredAgents(data);
      setSelectedCategory(null);
    } else {
      const newFilteredAgents = data.filter((agent: any) => {
        const agentRoleFrameID = Number(agent.RoleFrameID);
        const comparedRoleFrameID = Number(roleFrameID);
        console.log(
          `Agent ID: ${agent.ID}, Agent RoleFrameID: ${agentRoleFrameID}, Compared RoleFrameID: ${comparedRoleFrameID}`
        );
        return agentRoleFrameID === comparedRoleFrameID;
      });
      setFilteredAgents(newFilteredAgents);
      setSelectedCategory(roleFrameID);
    }
  };

  const handleSearch = (searchTerm: string) => {
    const searchLower = searchTerm.toLowerCase();
    const newFilteredAgents = data.filter((agent: any) =>
      agent.Name.toLowerCase().includes(searchLower)
    );
    setFilteredAgents(newFilteredAgents);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="bg-[#212529] h-screen overflow-y-auto p-6">
      <Head>
        <title>Marketplace Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="">
        <Navbar />
      </div>
      <div className="flex justify-center w-full flex-col items-center mb-12">
        <div className="flex flex-start w-full sm:w-[750px] mt-6">
          <SearchInput
            name_label={t("customer.marketplace.input")}
            placeholder="Search"
            invisible=""
            onSearch={handleSearch}
          />
        </div>
        <div className="flex justify-end w-full sm:w-[750px] mt-4">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="text-white bg-[#212529] border border-gray-300 rounded-lg p-2"
          >
            <option value="th">ไทย</option>
            <option value="en">English</option>
          </select>
        </div>
        <div
          className={`flex items-center w-full sm:w-[750px] mt-4 gap-4 ${clickOpencategory} overflow-x-auto scroll-container`}
        >
          {allRoles.map((roleFrameID: number, index: number) => (
            <RoleButton
              key={index}
              roleFrameID={roleFrameID}
              onClick={() => handleCategoryClick(roleFrameID)}
            />
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
            {t("customer.marketplace.more_role")}
          </button>
        </div>
        <div className="flex flex-col flex-initial w-full sm:w-[750px] items-center mt-4 gap-12">
          {Object.keys(groupedAgents).map((roleFrameID: any) => (
            <div
              key={roleFrameID}
              ref={(el) => {
                categoryRefs.current[roleFrameID] = el;
              }}
              className="flex flex-col sm:items-start gap-4 mb-4 w-full snap-x snap-mandatory hide-scrollbar overflow-x-scroll space-x-4"
            >
              <RoleCategory
                roleFrameID={roleFrameID}
                agents={groupedAgents[roleFrameID]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RoleCategory = ({
  roleFrameID,
  agents,
}: {
  roleFrameID: number;
  agents: any[];
}) => {
  const { roleName, isLoading, error } = GetRole(roleFrameID);

  if (isLoading) return null;
  if (error) return null;

  return (
    <>
      <h3 className="text-lg font-bold text-white w-full justify-start">
        {roleName}
      </h3>
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
            {agent.Role_Language === "th" && (
              <div className="absolute top-0 right-0 bg-white p-1 rounded-full">
                <Image
                  src="/png/thailand.png"
                  alt="Thai flag"
                  width={20}
                  height={20}
                />
              </div>
            )}
            {agent.Role_Language === "en" && (
              <div className="absolute top-0 right-0 bg-white p-1 rounded-full">
                <Image
                  src="/png/united-states-of-america.png"
                  alt="English flag"
                  width={20}
                  height={20}
                />
              </div>
            )}
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

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
