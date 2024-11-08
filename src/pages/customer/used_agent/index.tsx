import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useGlobal } from "@/context/context";
import ButtonChangeLanguage from "@/components/ButtonChangeLanguage";
import { GetMessages } from "@/services/api/GetMessagesAPI";
import Navbar from "@/components/Navbar";


interface Agent {
  ID: number;
  FirebaseID: string;
  AgentID: number;
  FrameworkID: number;
  Prompt: string;
  StyleMessageID: number;
  Language: string;
  Result: string;
  Model: string;
  Completion_tokens: number;
  Prompt_tokens: number;
  TimeStamp: string;
  Name: string;
  Description: string;
  ImageURL: string;
  AgentPrompt: string | null;
  AgentFrameworkID: number;
  RoleFrameID: number;
  TotalUsed: number;
}

const useAgent = () => {
  const { t } = useTranslation("common");
  const { user_prompt, setUserPrompt, style_message_id, agent } = useGlobal();
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState(null);
  const [firebaseId, setFirebaseId] = useState("");
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const firebase_id = userData.user?.firebase_id || "";
    setFirebaseId(firebase_id);
  }, []);



  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/customer/agent_usage/${firebaseId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Agent[] = await response.json();
      setAgentList(data);
    } catch (error) {
      console.error("Error fetching agent list:", error);
    }
  };

  useEffect(() => {
    if (firebaseId) {
      fetchData();
    }
  }, [firebaseId]);

  const filteredAgents = agentList.filter((agent: Agent) =>
    new RegExp(searchQuery, "i").test(agent.Name)
  );

  return (
    <div className="bg-[#212529] p-6 min-h-screen flex flex-col justify-center items-center">
      <Head>
        <title>{t("customer.useAgent.title")}</title>
        <meta name="description" content="" />
      </Head>
      <Navbar />
      <div className="absolute top-4 right-4">
        <div className="flex gap-2">
          
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 w-full mt-4">
            {filteredAgents.map((agent: Agent, index: number) => (
              <Link href={`/customer/${agent.AgentID}`} key={index}>
                <div
                  className="flex flex-col items-center md:w-[250px] sm:w-[300px] lg:w-[300px] border border-blue-400 p-4 rounded-lg bg-[#1a1d21] hover:bg-[#2A73FF] transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-center rounded-full h-[75px] w-[75px] bg-[#2A73FF] mb-4">
                    <img src={agent.ImageURL} alt={agent.Name} className="h-full w-full object-cover rounded-full" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-[15px] mb-1">{agent.Name}</p>
                    <p className="text-white text-[12px] mb-1">{agent.Description}</p>
                    <p className="text-white text-[12px] mb-1">{agent.Prompt}</p>
                    <p className="text-white text-[12px] mb-1">{new Date(agent.TimeStamp).toLocaleString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default useAgent;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});