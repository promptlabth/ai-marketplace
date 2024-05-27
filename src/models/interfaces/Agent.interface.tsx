import { PromptMessage } from "../types/agent.type";

export interface AgentInterface {
  ID: number;
  Name: string;
  ImageUrl: string;
  Description: string;
  Prompt: any;
  UserID: number;
  FrameworkID: number;
  RoleFrameID: number;
}

	// ID string          `json:"id"`
	// Name          string          `json:"name"`
	// Description   string          `json:"description"`
	// ImageURL      string          `json:"image_url"`
	// Prompt        json.RawMessage `json:"prompt"`
	// UserID        string           `json:"user_id"`
	// FrameworkID   string           `json:"framework_id"`
	// RoleFrameID   string           `json:"role_frame_id"`