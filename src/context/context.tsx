import { AgentInterface } from "@/models/interfaces/Agent.interface";
import React, { createContext, useContext, useState, ReactNode } from "react";

const GlobalContext = createContext<any>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [agent_name, setAgentName] = useState<string>("");
  const [agent_image, setAgentImage] = useState<string>("");
  const [agent_describe, setAgentDescribe] = useState<string>("");
  const [prompt, setPrompt] = useState();
  const [role_framework_id, setRoleID] = useState<number>(0);
  const [framework_id, setFramworkID] = useState<number>(0);

  //for customer useAgent
  const [user_prompt, setUserPrompt] = useState<string>("");
  const [agent, setAgent] = useState<AgentInterface>();
  const [style_message_id, setStyleMessageID] = useState<number>(0);

  return (
    <GlobalContext.Provider
      value={{
        agent_name,
        agent_image,
        agent_describe,
        prompt,
        role_framework_id,
        framework_id,
        setAgentName,
        setAgentImage,
        setAgentDescribe,
        setPrompt,
        setFramworkID,
        setRoleID,
        user_prompt,
        setUserPrompt,
        style_message_id,
        setStyleMessageID,
        agent,
        setAgent,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
