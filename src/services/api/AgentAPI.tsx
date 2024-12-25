import axios from "axios";

export async function CreatePostAgent(data: {
  name: string;
  description: string;
  image_url: string;
  prompt: any;
  firebase_id: string;
  framework_id: number;
  role_framework_id: number;
  total_used: number;
}) {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/creator/agent_detail`;
  const token = localStorage.getItem("authorization");
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      console.log("response", response.data);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return { reply: "Error Please try again" };
  }
}





