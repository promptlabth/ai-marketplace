import axios from "axios";

export async function GetMessages(
  language: string,
  data: {
    firebase_id: string;
    agent_id: number;
    prompt: string;
    style_message_id: number;
  }
) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${language}/customer/use_agent/messages`;

  try {
    const response = await axios.post(apiUrl, data, requestOptions);
    console.log("response", response);
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.error("Error GetMessages ", error);
    return { reply: "Error Please try again" };
  }
}
