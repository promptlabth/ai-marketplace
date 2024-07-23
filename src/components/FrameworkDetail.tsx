import GetFramework from "@/services/api/GetFramework";
import { TFunction } from "next-i18next";
interface FrameworkDetailProps {
  translations: TFunction;
  FrameworkID: number; // Assuming roleFrameID is also a prop
}

const FrameworkDetail: React.FC<FrameworkDetailProps> = ({
  translations,
  FrameworkID,
}) => {
  const { data, isLoading, error } = GetFramework(FrameworkID);

  if (isLoading) return null;
  if (error) return null;

  return (
    <>
      <div className="flex text-[#03FCA9] border-b-[1px]">
        {translations("customer.marketplace.viewAgent.Framework")}:
        <p className="px-2  text-white">{data?.framework?.Name}</p>
      </div>
      <div className="flex flex-col text-[#03FCA9] mt-8">
        {translations("customer.marketplace.viewAgent.FrameworkDetail")}:
        <p className="text-white">{data?.framework?.Detail}</p>
      </div>
    </>
  );
};

  export default FrameworkDetail