import data from "@/domain/creator/create_agent/__mock__/list_agent.json"
import SearchInput from "@/components/SearchInput"

const listAgent = () => {
  return (
    <div className="bg-[#212529] h-screen overflow-y-auto p-6">
      <SearchInput name_label="ค้นหา AI ของคุณ" placholder="ค้นหา" />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-fit mt-8">
        {data.map((component, index) => (
          <div key={index} className="flex w-full h-fit">
            <div className="flex items-center border-2 rounded-full h-[70px] bg-[#2A73FF]">
              <p className="text-white">{component.image_url}</p>
            </div>
            <div className="px-4 text-sm ">
              <p className="text-white font-bold text-[15px]">{component.name_agent}</p>
              <p className="text-[#697179] text-[10px] ">{component.agent_detial}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default listAgent;