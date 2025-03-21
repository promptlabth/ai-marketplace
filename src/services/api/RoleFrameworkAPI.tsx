import axios from "axios";

export async function GetRoleFrameworks(language:string) {
  const token = localStorage.getItem("authorization");
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/creator/roles/${language}`;
  try {
    const response = await axios.get(apiUrl, requestOptions);
    if (response.status === 200) {
      console.log("response");
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return { reply: "Error Please try again" };
  }
}
