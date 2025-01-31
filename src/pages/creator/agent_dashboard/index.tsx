import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from "@/components/Navbar";
import { useTranslation } from "next-i18next";

interface Agent {
  ID: number;
  Name: string;
  Description: string;
  ImageURL: string;
  Prompt: Record<string, string>;
  FirebaseID: string;
  FrameworkID: number;
  RoleFrameID: number;
  TotalUsed: number;
  Status: string;
}

const Index = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [firebaseId, setFirebaseId] = useState<string>("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const firebase_id = userData.user?.firebase_id || "";
    setFirebaseId(firebase_id);
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      if (firebaseId) {
        try {
          const token = localStorage.getItem("authorization");
          if (!token) {
            throw new Error("Authorization token not found");
          }

          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/agent/user_id`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setAgents(data.agents || []);
        } catch (error) {
          console.error("Error fetching agents:", error);
        }
      }
    };

    fetchAgents();
  }, [firebaseId]);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.Name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.Status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const approvedAgents = filteredAgents.filter(agent => agent.Status === 'approve');
  const pendingAgents = filteredAgents.filter(agent => agent.Status === 'pending');
  const rejectedAgents = filteredAgents.filter(agent => agent.Status === 'reject');

  const handleAgentClick = (agent: Agent) => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const firebase_id = userData.user?.firebase_id || "";
    if (agent.Status === 'reject') {
      router.push(`/creator/agent_status/reject/${firebase_id}/${agent.ID}`);
    } else if (agent.Status === 'approve') {
      router.push(`/creator/agent_status/approve/${firebase_id}/${agent.ID}`);
    } else if (agent.Status === 'pending') {
      router.push(`/creator/agent_status/pending/${firebase_id}/${agent.ID}`);
    }
  };

  const renderAgents = (agents: Agent[]) => (
    <div className="flex flex-wrap justify-center gap-4">
      {agents.map(agent => {
        let borderColor = 'border-blue-400';
        if (agent.Status === 'pending') {
          borderColor = 'border-yellow-400';
        } else if (agent.Status === 'reject') {
          borderColor = 'border-red-400';
        }

        return (
          <div
            key={agent.ID}
            className={`flex flex-col items-center w-full max-w-[300px] border ${borderColor} p-4 rounded-lg bg-[#1a1d21] hover:bg-[#02ffac] transition-all duration-200 cursor-pointer shadow-lg transform hover:scale-105`}
            onClick={() => handleAgentClick(agent)}
          >
            <div className="flex items-center justify-center rounded-full h-[75px] w-[75px] bg-[#02ffac] mb-4">
              <img src={agent.ImageURL} alt={agent.Name} className="h-full w-full object-cover rounded-full" />
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-[15px] mb-1 overflow-hidden overflow-ellipsis whitespace-nowrap">{agent.Name}</p>
              <p className="text-white text-[12px] mb-1 overflow-hidden overflow-ellipsis whitespace-normal">{agent.Description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-[#212529] p-6 min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      <h1 className="font-bold text-white text-[25px] mb-4 mt-4">{t("creator.agent_dashboard.header.dashboard")}</h1>
      <div className="w-full max-w-[940px] mb-8">
        <div className="text-white text-lg mb-4">
          {t("creator.agent_dashboard.header.total_agents")} {agents.length}
        </div>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02ffac] mb-4"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02ffac]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">{t("creator.agent_dashboard.options.all")}</option>
          <option value="approve">{t("creator.agent_dashboard.options.approve")}</option>
          <option value="pending">{t("creator.agent_dashboard.options.pending")}</option>
          <option value="reject">{t("creator.agent_dashboard.options.reject")}</option>
        </select>
      </div>
      <div className="w-full max-w-[940px]">
        {statusFilter === 'all' ? (
          <>
            <h2 className="text-white text-[20px] mb-4">{t("creator.agent_dashboard.header.approved_agents")}</h2>
            {approvedAgents.length > 0 ? renderAgents(approvedAgents) : <p className="text-white">No approved agents found.</p>}
            
            <h2 className="text-white text-[20px] mb-4 mt-8">{t("creator.agent_dashboard.header.pending_agents")}</h2>
            {pendingAgents.length > 0 ? renderAgents(pendingAgents) : <p className="text-white">No pending agents found.</p>}
            
            <h2 className="text-white text-[20px] mb-4 mt-8">{t("creator.agent_dashboard.header.reject_agents")}</h2>
            {rejectedAgents.length > 0 ? renderAgents(rejectedAgents) : <p className="text-white">No rejected agents found.</p>}
          </>
        ) : (
          renderAgents(filteredAgents)
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Index;