import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

interface UserUsage {
    profile_picture: string;
    user_name: string;
    usage_count: number;
}

interface Agent {
  agent_name: string;
  agent_id: number;
  image: string;
  user_usage: UserUsage[];
  total_usage: number;
}

const AgentUsage = () => {
  const [agentsData, setAgentsData] = useState<Agent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchAgentUsage = async () => {
      try {
        const token = localStorage.getItem("authorization");
        if (!token) {
          console.error("Authorization token not found");
          router.push("/");
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/history/agent_usage`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data) {
          setAgentsData(data);
        } else {
          setAgentsData([]);
        }
      } catch (error) {
        console.error("Error fetching agent usage data:", error);
      }
    };

    fetchAgentUsage();
  }, [router]);

  const filteredAgents = agentsData.length > 0 ? agentsData.filter(agent =>
    agent.agent_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="bg-[#212529] p-6 min-h-screen flex flex-col justify-center items-center">
      <Navbar />
      {agentsData.length > 0 ? (
        <div>
          <h1 className="font-bold text-white text-[25px] mb-4 mt-4">Agent Usage</h1>
          <div className="w-full max-w-[940px] mb-8">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02ffac] mb-4"
              placeholder="Search by agent name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[940px]">
            {filteredAgents.map((agent) => (
              <div key={agent.agent_id} className="mb-8 bg-[#33393F] p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img src={agent.image} alt={agent.agent_name} className="h-16 w-16 object-cover rounded-full mr-4" />
                  <div>
                    <h2 className="text-white text-[20px] font-bold">{agent.agent_name}</h2>
                    <p className="text-white">Total Usage: {agent.total_usage}</p>
                  </div>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                  {agent.user_usage.map((user, index) => (
                    <div key={index} className="flex items-center bg-[#212529] p-4 rounded-lg shadow-md min-w-[300px]">
                      <img src={user.profile_picture} alt={user.user_name} className="h-12 w-12 object-cover rounded-full mr-4" />
                      <div>
                        <p className="text-white font-bold">{user.user_name}</p>
                        <p className="text-white">Usage Count: {user.usage_count}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='w-full max-w-[940px] flex flex-col items-center justify-center'>
          <h1 className='mt-8 text-2xl text-center text-gray-400'>No Agent Usage found.</h1>
          <div className='w-1/2 mt-4 mb-4 flex flex-col items-center justify-center'>
            <button className='w-full mt-2 border border-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700' 
              onClick={() => router.push('/customer/marketplace')}>
              <span>Ai Shop</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const getStaticProps = async ({ locale }: any) => ({
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  });

export default AgentUsage;