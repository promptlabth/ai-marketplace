export interface AgentInterface {
  ID: number;
  Name: string;
  Description: string;
  ImageURL: string;
  Prompt: string | null;
  FirebaseID: string;
  FrameworkID: number;
  RoleFrameID: number;
  Language: string;
}
