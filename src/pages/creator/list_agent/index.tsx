import Head from 'next/head';
import CreatorLayout from "../CreatorLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { AgentInterface } from "@/models/interfaces/Agent.interface";



const listAgent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgentList] = useState<AgentInterface[]>([]);

  const handleSearchChange = (e:any) => {
    setSearchQuery(e.target.value);
  };

  const mock_firebase_id = "u123"; 

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/creator/${mock_firebase_id}`);
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
  return (
    <CreatorLayout>
      <div className="flex flex-col bg-[#212529] min-h-screen overflow-y-auto p-6">
      <Head>
        <title>List Agent</title>
        <meta name="description" content="List of recently used AI agents" />
      </Head>
      <div className="flex justify-center w-full mb-12">
        <div className="flex flex-col items-center mt-8 gap-4 md:w-[540px] lg:w-[940px] w-full">
          <h1 className="font-bold text-white text-[25px] mb-4">AI ที่ใช้งานล่าสุด</h1>
          <div className="w-full md:w-[540px] lg:w-[940px]">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="ค้นหา AI ของคุณ"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 w-full mt-4">
            {filteredAgents.map((agent:any, index:number) => (
              <Link
                href="/creator/dashboard_agent"
                key={index}
                className="flex flex-col items-center md:w-[250px] sm:w-[300px] lg:w-[300px] border border-blue-400 p-4 rounded-lg bg-[#1a1d21] hover:bg-[#2A73FF] transition-all duration-200"
              >
                <div className="flex items-center justify-center rounded-full h-[75px] w-[75px] bg-[#2A73FF] mb-4">
                  <img src={agent.ImageURL} alt={agent.Name} className="h-full w-full object-cover rounded-full" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-[15px] mb-1">{agent.Name}</p>
                
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </CreatorLayout>
  );
}

export default listAgent;