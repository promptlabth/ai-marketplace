import React from "react";
import { useGlobal } from "@/context/context";
import { CreatePostAgent } from "@/services/api/AgentAPI";
import { useRouter } from "next/router";

const useEditAgents = () => {
  const {
    agent_name,
    agent_image,
    agent_describe,
    prompt,
    role_framework_id,
    framework_id,
  } = useGlobal();

  const router = useRouter();
  console.log(">> agent_describe", agent_describe);
  const handleCreateAgent = async () => {

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const firebase_id = userData.user?.firebase_id || "null";
    const agentDetails = {
      name: agent_name,
      description: agent_describe,
      image_url: agent_image,
      prompt: prompt,
      firebase_id: firebase_id,
      framework_id: framework_id,
      role_framework_id: role_framework_id,
      total_used: 0
    };
    console.log("AgentDetails", agentDetails);

    const result = await CreatePostAgent(agentDetails);

    if (result.status === "success") {
      console.log(result);
      router.push("/creator/list_agent");
    } else {
      console.log("CreateAgent", result);
    }
  };
  return {
    EditAgentItems: {
      handleCreateAgent,
    },
  };
};

export default useEditAgents;
