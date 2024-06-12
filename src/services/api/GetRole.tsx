import useSWR from 'swr';

interface Role {
    ID: number;
    Name: string;
}

interface Roles {
    role: Role;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function GetRole(id: number) {
    const { data, isLoading, error } = useSWR<Roles>(`${process.env.NEXT_PUBLIC_BASE_URL}/creator/role/${id}`, fetcher);
    const roleName = data?.role?.Name;
    if (roleName) {
        console.log("role", roleName)
    }   

    return {
        roleName,
        isLoading,
        error
    };
}
