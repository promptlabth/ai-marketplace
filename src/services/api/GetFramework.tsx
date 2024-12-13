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

const fetcher = async (url: string) => {
  const token = localStorage.getItem("authorization");
  if (!token) {
    throw new Error("Authorization token not found");
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token, // Attach the token
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};


export default function GetFramework(id: number) {
  console.log("Framework ID", id);
  const { data, isLoading, error } = useSWR<FramwwrokID>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/creator/framework/${id}`,
    fetcher // Use the updated fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
}

