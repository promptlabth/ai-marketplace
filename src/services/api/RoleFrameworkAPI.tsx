import axios from "axios";

export async function apiGetRoleFrameworks() {

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiUrl = `http://localhost:8081/creator/roles`;
  try {
    // const accessToken = await getAccessToken();

    // const requestOption = {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // };
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
