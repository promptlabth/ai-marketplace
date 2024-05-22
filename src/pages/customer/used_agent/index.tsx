import { useState } from "react";
import data from "@/domain/creator/create_agent/__mock__/list_agent.json";
import Head from "next/head";
import Link from "next/link";

const UsedAgent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered agents based on the search query
  const filteredAgents = data.filter(agent =>
    new RegExp(searchQuery, "i").test(agent.name_agent)
  );

  return (
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
            {filteredAgents.map((agent, index) => (
              <Link
                href="/customer/history_agent"
                key={index}
                className="flex flex-col items-center md:w-[250px] sm:w-[300px] lg:w-[300px] border border-blue-400 p-4 rounded-lg bg-[#1a1d21] hover:bg-[#2A73FF] transition-all duration-200"
              >
                <div className="flex items-center justify-center rounded-full h-[75px] w-[75px] bg-[#2A73FF] mb-4">
                  <img src={agent.image_url} alt={agent.name_agent} className="h-full w-full object-cover rounded-full" />
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-[15px] mb-1">{agent.name_agent}</p>
                  <p className="text-white text-[10px] mb-1">{agent.time_used}</p>
                  <p className="text-white text-[10px]">ใช้งาน: {agent.count_use} ครั้ง</p>
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
