import data from "@/domain/creator/create_agent/__mock__/list_agent.json"
import SearchInput from "@/components/SearchInput"
import Head from 'next/head';
import CreatorLayout from "../CreatorLayout";
import Link from "next/link";

const listAgent = () => {
  return (
    <CreatorLayout>
      <div className="flex flex-col bg-[#212529] min-h-screen overflow-y-auto p-6">
        <Head>
          <title>List Agent</title>
          <meta name="description" content="" />
        </Head>
        <div className="flex justify-center w-full mt-6">
          <div className="flex flex-row flex-wrap mb-12 gap-4 flex-initial md:w-[540px] lg:w-[940p]">
            <SearchInput name_label="ค้นหา AI ของคุณ" placeholder="Search" invisible="sm:visible" />
            {data.map((component, index) => (
              <Link href="/creator/dashboard_agent" key={index} className="flex flex-initial md:w-[250px] sm:w-[300px] lg:w-[300px] h-fit border-blue-400">
                <div className="flex items-center rounded-full h-[78px] bg-[#2A73FF]">
                  <p className="text-white">{component.image_url}</p>
                </div>
                <div className="px-4 text-sm">
                  <div className="flex w-full">
                    <p className="text-white font-bold text-[15px]">{component.name_agent}</p>
                    {component.new ?
                      (
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      ) : null
                    }
                  </div>
                  <p className="text-[#697179] text-[10px]">{component.agent_detial}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </CreatorLayout>
  );
}

export default listAgent;