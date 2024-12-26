import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function useAgents(language: string) {
    const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/agents/approve`, fetcher);

    const filteredData = data?.agents.filter((agent: any) => agent.Language === language);

    return {
        data: filteredData,
        isLoading,
        error
    };
}
