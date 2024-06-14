// RoleCategory.tsx
import GetRole from "@/services/api/GetRole";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

interface Agent {
  ID: number;
  ImageURL: string;
  Name: string;
  Description: string;
}

interface RoleCategoryProps {
  roleFrameID: number;
  agents: Agent[];
}

const RoleCategory: FC<RoleCategoryProps> = ({ roleFrameID, agents }) => {
  const { roleName, isLoading, error } = GetRole(roleFrameID);

  if (isLoading) return null;
  if (error) return null;

  return (
    <>
      <h3 className="text-lg font-bold text-white w-full justify-start">{roleName}</h3>
      <div className="flex gap-4">
        {agents.map((agent) => (
          <Link
            key={agent.ID}
            href={`/customer/${agent.ID}`}
            className="flex items-center flex-col relative flex-none rounded-[30px] w-[170px] h-[300px] p-2 bg-[#697179]"
          >
            <div className="flex items-center overflow-hidden justify-center w-[100px] h-[100px] border-2 rounded-full bg-gray-800 relative">
              {agent.ImageURL ? (
                <Image
                  src={agent.ImageURL}
                  alt="Agent image"
                  layout="fill"
                  className="object-cover"
                />
              ) : (
                <p>Image not available</p>
              )}
            </div>
            <p className="text-[#FFFFFF] font-bold text-[16px] mt-4">
              {agent.Name}
            </p>
            <article className="text-[#FFFFFF] text-[14px] mt-2 w-full text-wrap break-words">
              <p>{agent.Description}</p>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
};

export default RoleCategory;
