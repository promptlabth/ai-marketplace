import axios from "axios";

export async function apiGetFrameworks() {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/creator/frameworks`;
  try {
    const response = await axios.get(apiUrl, requestOptions);
    if (response.status === 201) {
      console.log("response");
      return response.data;
    }
  } catch (error) {
    console.error("Error apiGetFrameworks ",error);
    return { reply: "Error Please try again" };
  }
}