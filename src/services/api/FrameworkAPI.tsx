import axios from "axios";


export async function GetFrameworks(language:string) {
 
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${language}/creator/frameworks`;
  try {
    const response = await axios.get(apiUrl, requestOptions);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error apiGetFrameworks ",error);
    return { reply: "Error Please try again" };
  }
}
