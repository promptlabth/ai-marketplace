import { AgentInterface } from "@/models/interfaces/Agent.interface";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProfileUser } from "@/models/interfaces/Login.interface";

interface GlobalProviderProps {
  children: ReactNode;
}

interface IGlobalExportContext {
  setAgentName: React.Dispatch<React.SetStateAction<string>>;
  setAgentImage: React.Dispatch<React.SetStateAction<string>>;
  setAgentDescribe: React.Dispatch<React.SetStateAction<string>>;
  setPrompt: React.Dispatch<React.SetStateAction<any>>;
  setRoleID: React.Dispatch<React.SetStateAction<number>>;
  setFramworkID: React.Dispatch<React.SetStateAction<number>>;
  setUserPrompt: React.Dispatch<React.SetStateAction<string>>;
  setStyleMessageID: React.Dispatch<React.SetStateAction<number>>;
  setAgent: React.Dispatch<React.SetStateAction<AgentInterface | undefined>>;
  setRealTimeMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  realTimeMessage: string | undefined;
  agent_name: string;
  agent_image: string;
  agent_describe: string;
  prompt: any;
  role_framework_id: number;
  framework_id: number;
  user_prompt: string;
  agent: AgentInterface | undefined;
  style_message_id: number;
  user?: ProfileUser;
  handleSetUser: (user: ProfileUser) => void;

}

const GlobalContext = createContext<IGlobalExportContext>({} as IGlobalExportContext);


export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<ProfileUser>();

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
  
  const [realTimeMessage, setRealTimeMessage] = useState<string>();

  const handleSetUser = (user: ProfileUser) => {
    setUser(user);
  }

  
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
    handleSetUser,
    setRealTimeMessage,
    realTimeMessage,
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
