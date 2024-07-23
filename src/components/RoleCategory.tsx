import GetRole from "@/services/api/GetRole";
import { TFunction } from "next-i18next";
interface RoleCategoryProps {
  translations: TFunction;
  roleFrameID: number; // Assuming roleFrameID is also a prop
}

const RoleCategory: React.FC<RoleCategoryProps> = ({
  translations,
  roleFrameID,
}) => {
  const { roleName, isLoading, error } = GetRole(roleFrameID);

  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="flex text-[#03FCA9]">
      {translations("customer.marketplace.viewAgent.AIType")}:
      <p className="px-2 text-white">{roleName}</p>
    </div>
  );
};

export default RoleCategory;
