import data from "@/domain/creator/create_agent/__mock__/list_agent.json"
import SearchInput from "@/components/SearchInput"
import SearchInputFloat from "@/components/SearchInput_float"
import Head from 'next/head';

const listAgent = () => {
  return (
    <div className="flex flex-col bg-[#212529] min-h-screen overflow-y-auto p-6">
      <Head>
        <title>List Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex justify-center w-full">
        <div className="flex flex-row flex-wrap mt-8 gap-4 flex-initial md:w-[540px] lg:w-[940px]">
          <SearchInput name_label="ค้นหา AI ของคุณ" placeholder="Search" invisible="sm:visible" />
          {data.map((component, index) => (
            <div key={index} className="flex flex-initial md:w-[250px] sm:w-[300px] lg:w-[300px] h-fit border-blue-400">
              <div className="flex items-center rounded-full h-[75px] bg-[#2A73FF]">
                <p className="text-white">{component.image_url}</p>
              </div>
              <div className="px-4 text-sm">
                <p className="text-white font-bold text-[15px]">{component.name_agent}</p>
                <p className="text-[#697179] text-[10px]">{component.agent_detial}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default listAgent;