// import axios from "axios";

// export async function apiPostAgent(data: {
//   name: string;
//   description: string;
//   image_url: string;
//   prompt: any;
//   user_id: string;
//   framework_id: number;
//   role_framework_id: number;
// }) {
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/creator/agent_detail`;

//   try {
//     const response = await axios.post(apiUrl, requestOptions);
//     if (response.status === 201) {
//       console.log("response");
//       return response.data;
//     }
//   } catch (error) {
//     console.error(error);
//     return { reply: "Error Please try again" };
//   }
// }
import axios from "axios";
// import { useRouter } from 'next/navigation';

export async function apiPostAgent(data: {
  name: string;
  description: string;
  image_url: string;
  prompt: any;
  user_id: string;
  framework_id: number;
  role_framework_id: number;
}) {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/creator/agent_detail`;
  // const router = useRouter();
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      console.log("response");
      // router.push("/creator/list_agent");
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return { reply: "Error Please try again" };
  }
}
