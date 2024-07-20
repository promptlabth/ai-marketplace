import GetRole from "@/services/api/GetRole";

const RoleCategory = ({ roleFrameID }: { roleFrameID: number }) => {
  const { roleName, isLoading, error } = GetRole(roleFrameID);
  
  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="flex text-[#03FCA9]">
      AI Type:<p className="px-2 text-white">{roleName}</p>
    </div>
  );
};

export default RoleCategory;
