import useSWR from 'swr';


interface Agent {
    ID: number;
    Name: string;
    Description: string;
    ImageURL: string;
    Prompt: string | null;
    UserID: string;
    FrameworkID: number;
    RoleFrameID: number;
  }

interface AgentID {
    agent: Agent
}
  

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function useGetAgent(id: number) {
    console.log("Agent ID", id)
    const { data, isLoading, error } = useSWR<AgentID>(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/agent/${id}`, fetcher); 

    return {
        data,
        isLoading,
        error
    };
}
