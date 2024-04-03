import SearchInput from "@/components/SearchInput"
import data from "@/domain/customer/marketplace/__mock__/market.json"
import { useState } from "react";
import Head from 'next/head';
import { useRouter } from "next/navigation";

const CreateAgent = () => {
  const [clickOpencategory, setOpencategory] = useState<string>("flex-nowrap")
  const router = useRouter();
  return (
    <div className="bg-[#212529] h-screen overflow-y-auto p-6">
      <Head>
        <title>Marketplace Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex justify-center w-full flex-col items-center mb-12">
        <div className="flex flex-start w-full sm:w-[750px] mt-6">
          <SearchInput name_label="ค้นหา AI ของคุณ" placeholder="Search"  invisible=""/>
        </div>
        <div className={`flex items-center w-full sm:w-[750px] mt-4 gap-4 ${clickOpencategory} overflow-x-auto`}>
          {data.map((category, index) => (
            <button key={index} className="flex-none p-2 border-2 border-[#03FFAB] w-fit h-fit p-1 rounded hover:bg-[#03FFAB] focus:bg-[#03FFAB] text-sm text-[#03FFAB] focus:text-black hover:text-black">
              {category.category}
            </button>
          ))}
        </div>
        <div className="flex justify-end w-full sm:w-[750px]">
          <button onClick={() => { setOpencategory(currentHeight => currentHeight === "flex-nowrap" ? "flex-wrap" : "flex-nowrap"); }} className="text-white underline focus:text-gray-300 hover:text-gray-300 mt-4">ดูเพิ่มเติม</button>
        </div>
        <div className="flex flex-col flex-initial w-full sm:w-[750px] items-center mt-4 gap-12">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col sm:items-start gap-4 mb-4 w-full snap-x snap-mandatory hide-scrollbar overflow-x-scroll space-x-4">
              <h3 className="text-lg font-bold text-white w-full justify-start">{item.category}</h3>
              <div className="flex gap-4">
                {item.agents.map((agent, agentIndex) => (
                  <div onClick={() => { router.push("/customer/view_agent") }} key={agentIndex} className="flex items-center flex-col flex-none rounded-[30px] w-[170px] h-[300px] p-2 bg-[#697179]">
                    <div key={agentIndex} className="flex items-center justify-center w-[100px] h-[100px] border-2 rounded-full bg-blue-500">{agent.image_url}</div>
                    <div key={agentIndex} className="text-[#FFFFFF] font-bold text-[16px] mt-4">{agent.name_agent}</div>
                    <div key={agentIndex} className="text-[#FFFFFF] text-[14px]">{agent.agent_detail}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateAgent;