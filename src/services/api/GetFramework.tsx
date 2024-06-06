import useSWR from 'swr';


interface Framwwork {
    ID: number;
    Name: string;
    Detail: string;
    Component: any[];
  }

interface FramwwrokID {
    framework: Framwwork
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function GetFramework(id: number) {
    console.log("Framwork ID", id)
    const { data, isLoading, error } = useSWR<FramwwrokID>(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/framework/${id}`, fetcher); 

    return {
        data,
        isLoading,
        error
    };
}
