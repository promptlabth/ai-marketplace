import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { AgentInterface } from "@/models/interfaces/Agent.interface";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import StudioMenu from "@/components/StudioiMenu";

const ListAgent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgentList] = useState<AgentInterface[]>([]);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("authorization");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/creator/agent/user_id`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("successfully:", response.data);
      if (response.status === 201 && response.data.status === "success") {
        console.log("Get agentList success");
        setAgentList(response.data.agents);
      }
    } catch (error) {
      console.error("Error Get agentList", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredAgents = agents.filter((agent: any) =>
    new RegExp(searchQuery, "i").test(agent.Name)
  );
  console.log("agents:", agents);

  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col bg-[#212529] min-h-screen overflow-y-auto p-6">
      <Head>
        <title>{t("listAgent.creator.recentlyUseAI")}</title>
        <meta name="description" content="List of recently used AI agents" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <ButtonChangeLanguage />
          <StudioMenu translations={t} />
        </div>
      </div>
      <div className="flex justify-center w-full mb-12">
        <div className="flex flex-col items-center mt-8 gap-4 md:w-[540px] lg:w-[940px] w-full">
          <h1 className="font-bold text-white text-[25px] mb-4">
            {t("listAgent.creator.recentlyUseAI")}
          </h1>
          <div className="w-full md:w-[540px] lg:w-[940px]">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder={t("listAgent.creator.placeholder.search")}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 w-full mt-4">
            {filteredAgents.map((agent: any, index: number) => (
              <Link
                href="/creator/dashboard_agent"
                key={index}
                className="flex flex-col items-center md:w-[250px] sm:w-[300px] lg:w-[300px] border border-blue-400 p-4 rounded-lg bg-[#1a1d21] hover:bg-[#2A73FF] transition-all duration-200"
              >
                <div className="flex items-center justify-center rounded-full h-[75px] w-[75px] bg-gray-800 mb-4">
                  <img
                    src={agent.ImageURL}
                    alt={agent.Name}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-[15px] mb-1">
                    {agent.Name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAgent;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
