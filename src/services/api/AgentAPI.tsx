import axios from "axios";

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
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
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


export async function apiGetAgentByFBId(mock_firebase_id: string) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiUrl = `http://localhost:8081/creator/${mock_firebase_id}`;

  try {
    const response = await axios.get(apiUrl, requestOptions);
    if (response.status === 200) {
      console.log("response:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error occurred while fetching data");
  }
}

