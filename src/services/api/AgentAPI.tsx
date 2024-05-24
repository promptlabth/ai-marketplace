import axios from "axios";

export async function apiPostAgent() {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
    const apiUrl = `http://localhost:8081/creator/agent_detail`;
    
  try {
    const response = await axios.post(apiUrl, requestOptions);
    if (response.status === 200) {
      console.log("response");
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return { reply: "Error Please try again" };
  }
}
