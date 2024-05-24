import { PromptMessage } from '@/models/types/agent.type';
import React, { createContext, useContext, useState, ReactNode } from 'react';

const GlobalContext = createContext<any>(undefined);

// Define the provider component
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [agent_name, setAgentName] = useState<string>("")
  const [agent_image, setAgentImage] = useState<string>("")
  const [agent_describe, setAgentDescribe] = useState<string>("")
  const [prompt, setPrompt] = useState<PromptMessage>()

  return (
    <GlobalContext.Provider value={{ agent_name, agent_image, agent_describe, setAgentName, setAgentImage, setAgentDescribe, setPrompt, prompt }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
