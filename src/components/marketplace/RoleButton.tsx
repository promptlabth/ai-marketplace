import GetRole from "@/services/api/GetRole";   

const RoleButton = ({
    roleFrameID,
    onClick,
  }: {
    roleFrameID: number;
    onClick: (roleFrameID: number) => void;
  }) => {
    const { roleName, isLoading, error } = GetRole(roleFrameID);
    if (isLoading) return null;
    if (error) return null;
  
    return (
      <button
        onClick={() => onClick(roleFrameID)}
        className="flex-none p-2 border-2 border-[#03FFAB] w-fit h-fit rounded hover:bg-[#03FFAB] focus:bg-[#03FFAB] text-sm text-[#03FFAB] focus:text-black hover:text-black scroll-item"
      >
        {roleName}
      </button>
    );
  };

  export default RoleButton;