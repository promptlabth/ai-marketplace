import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AllAgents() {
    const { data, isLoading,error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/agents/approve`, fetcher);

    return {
        data,
        isLoading,
        error
    };
}
