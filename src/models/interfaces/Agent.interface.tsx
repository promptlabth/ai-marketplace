import { PromptMessage } from "../types/agent.type";

export interface AgentInterface {
  FrameWork: string;
  Name: string;
  ImageUrl: string;
  Description: string;
  JSON: PromptMessage
}
