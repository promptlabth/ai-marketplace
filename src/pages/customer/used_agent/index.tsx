import data from "@/domain/creator/create_agent/__mock__/list_agent.json"
import SearchInput from "@/components/SearchInput"
import Head from 'next/head';
import Link from "next/link";

const UsedAgent = () => {
  return (
    <div className="flex flex-col bg-[#212529] min-h-screen overflow-y-auto p-6">
      <Head>
        <title>List Agent</title>
        <meta name="description" content="" />
      </Head>
      <div className="flex justify-center w-full">
        <div className="flex flex-row flex-wrap mt-8 gap-4 flex-initial md:w-[540px] lg:w-[940px]">
          <div className="flex w-full justify-center">
            <h1 className="font-bold text-white text-[25px]">AI ที่ใช้งานล่าสุด</h1>
          </div>
          <SearchInput name_label="ค้นหา AI ของคุณ" placeholder="Search" invisible="sm:visible" />
          {data.map((component, index) => (
            <Link href="/customer/history_agent" key={index} className="flex flex-initial md:w-[250px] sm:w-[300px] lg:w-[300px] h-fit border-blue-400">
              <div className="flex items-center rounded-full h-[75px] bg-[#2A73FF]">
                <p className="text-white">{component.image_url}</p>
              </div>
              <div className="px-4 text-sm">
                <p className="text-white font-bold text-[15px]">{component.name_agent}</p>
                <p className="text-white text-[10px]">{component.time_used}</p>
                <div>
                  <p className="text-white text-[10px]">ใช้งาน: {component.count_use} ครั้ง</p>
                </div>
              </div>
            </Link >
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsedAgent;
