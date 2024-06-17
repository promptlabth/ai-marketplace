import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";

const UsedAgent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [agentList, setAgentList] = useState<any>(null);
  const { t } = useTranslation("common");
  // Handler for search input change
  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const mock_firebase_id = "firebase_001";

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/${mock_firebase_id}`);
      console.log("successfully:", response.data);
      // setAgentList(response.data);//ไอ้นี่ทํางานได้
      if (response.status === 200 && response.data.status === "success") {
        console.log("Get agentList success");
        setAgentList(response.data);//ไอ้นี่ไม่ทํางานได้
      }
    } catch (error) {
      console.error("Error Get agentList", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // If agentList is null or undefined, return an empty array
  const agents = agentList?.agents || [];

  // Filtered agents based on the search query
  const filteredAgents = agents.filter((agent: any) =>
    new RegExp(searchQuery, "i").test(agent.Name)
  );


  return (
    <div className="flex flex-col bg-[#212529] min-h-screen overflow-y-auto p-6">
      <Head>
        <title>List Agent</title>
        <meta name="description" content="List of recently used AI agents" />
      </Head>
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          <ButtonChangeLanguage />
        </div>
      </div>
      <div className="flex justify-center w-full mb-12">
        <div className="flex flex-col items-center mt-8 gap-4 md:w-[540px] lg:w-[940px] w-full">
          <h1 className="font-bold text-white text-[25px] mb-4">{t("list_ai.customer.search_title")}</h1>
          <div className="w-full md:w-[540px] lg:w-[940px]">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder={t("list_ai.customer.search_placeholder")}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 w-full mt-4">
            {filteredAgents.map((agent: any, index: number) => (
              <Link
                href="/customer/history_agent"
                key={index}
                className="flex flex-col items-center md:w-[250px] sm:w-[300px] lg:w-[300px] border border-blue-400 p-4 rounded-lg bg-[#1a1d21] hover:bg-[#2A73FF] transition-all duration-200"
              >
                <div className="flex items-center justify-center rounded-full h-[75px] w-[75px] bg-[#2A73FF] mb-4">
                  <img src={agent.ImageURL} alt={agent.Name} className="h-full w-full object-cover rounded-full" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-[15px] mb-1">{agent.Name}</p>
                  {/* <p className="text-white text-[10px] mb-1">{agent.time_used}</p>
                  <p className="text-white text-[10px]">ใช้งาน: {agent.count_use} ครั้ง</p> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedAgent;


export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});