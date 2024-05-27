import useSWR from 'swr';

interface Role {
    ID: number;
    Name: string;
}

interface Roles {
    role: Role;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function useGetRole(id: number) {
    console.log("id", id)
    const { data, isLoading, error } = useSWR<Roles>(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/role/${id}`, fetcher);
    const roleID = data?.role?.Name;
    if (roleID) {
        console.log("role", roleID)
    }   

    return {
        roleID,
        isLoading,
        error
    };
}
