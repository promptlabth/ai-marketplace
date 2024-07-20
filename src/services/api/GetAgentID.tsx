import { AgentInterface } from '@/models/interfaces/Agent.interface';
import useSWR from 'swr';


// interface Agent {
//   ID: number;
//   Name: string;
//   Description: string;
//   ImageURL: string;
//   Prompt: string | null;
//   FirebaseID: string;
//   FrameworkID: number;
//   RoleFrameID: number;
// }

interface AgentID {
    agent: AgentInterface
}
  

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function GetAgent(id: number) {
    console.log("Agent ID", id)
    const { data, isLoading, error } = useSWR<AgentID>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/customer/${id}`,
      fetcher
    ); 
    
    return {
        data,
        isLoading,
        error
    };
}
