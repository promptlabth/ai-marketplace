import { AgentInterface } from "@/models/interfaces/Agent.interface";
import { PromptMessage } from "@/models/types/agent.type";
import React, { createContext, useState } from "react";

interface MyContextType {
  AgentDetail: AgentInterface;
  updateAgentDetail: (newValue: AgentInterface) => void;
}

const defaultAgentContextValue: MyContextType = {
  AgentDetail: {
    FrameWork: "",
    Name: "",
    ImageUrl: "",
    Description: "",
    JSON: {} as PromptMessage, 
  },
  updateAgentDetail: () => {},
};

const AgentContext = createContext<MyContextType>(defaultAgentContextValue);

const createAgent = () => {
  const [agentDetail, setAgentDetail] = useState<AgentInterface>(
    defaultAgentContextValue.AgentDetail
  );
  
  const updateAgentDetail = (newValue: AgentInterface) => {
    setAgentDetail(newValue);
  };

  return (
    <AgentContext.Provider
      value={{ AgentDetail: agentDetail, updateAgentDetail }}
    >
      <div>
        <h1>Create Agent</h1>
      </div>
    </AgentContext.Provider>
  );
};

export default createAgent;