import SearchInput from "@/components/SearchInput"
import data from "@/domain/customer/marketplace/__mock__/market.json"
import { useState } from "react";

const CreateAgent = () => {
  const [clickOpencategory, setOpencategory] = useState<string>("flex-nowrap")

  return (
    <main className="bg-[#212529] h-screen overflow-y-auto p-6">
      <SearchInput name_label="ค้นหา AI ของคุณ" placholder="ค้นหา" />
      <div className={`flex items-center mt-4 gap-4 ${clickOpencategory} overflow-x-auto`}>
        {data.map((category, index) => (
          <button key={index} className="flex-none border-2 border-[#03FFAB] w-fit h-fit p-1 rounded hover:bg-[#03FFAB] focus:bg-[#03FFAB] text-sm text-[#03FFAB] focus:text-white hover:text-white">
            {category.category}
          </button>
        ))}
      </div>
      <div className="w-full flex justify-end">
        <button onClick={() => { setOpencategory(currentHeight => currentHeight === "flex-nowrap" ? "flex-wrap" : "flex-nowrap"); }} className="text-white underline focus:text-gray-300 hover:text-gray-300">ดูเพิ่มเติม</button>
      </div>
      <div className="mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-4 mb-4">
            <h3 className="text-lg font-bold text-white">{item.category}</h3>
            <div className="flex gap-4 overflow-x-auto">
              {item.agents.map((agent, agentIndex) => (
                <div key={agentIndex} className="flex items-center flex-col flex-none border-2 rounded-[30px] w-[170px] p-2 bg-[#697179]">
                  <div key={agentIndex} className="flex items-center justify-center w-[100px] h-[100px] border-2 rounded-full bg-blue-500">{agent.image_url}</div>
                  <div key={agentIndex} className="text-[#FFFFFF] font-bold text-[16px]">{agent.name_agent}</div>
                  <div key={agentIndex} className="text-[#FFFFFF] text-[14px]">{agent.agent_detail}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}

export default CreateAgent;