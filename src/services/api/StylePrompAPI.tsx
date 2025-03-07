import axios from "axios";

export async function GetStylePrompts(language: string) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/customer/style_prompts/${language}`;
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
