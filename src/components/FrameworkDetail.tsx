import GetFramework from "@/services/api/GetFramework";

const FrameworkDetail = ({ FrameworkID }: { FrameworkID: number }) => {
    const { data, isLoading, error } = GetFramework(FrameworkID);
  
    if (isLoading) return null;
    if (error) return null;
  
    return (
      <>
        <div className="flex text-[#03FCA9] border-b-[1px]">Framwork:<p className="px-2  text-white">{data?.framework?.Name}</p></div>
        <div className="flex flex-col text-[#03FCA9] mt-8">อธิบาย Framwork:<p className="text-white">{data?.framework?.Detail}</p></div>
      </>
    );
  };

  export default FrameworkDetail