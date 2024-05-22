// import { FrameworkRequest } from "@/domain/creator/frameworks/FrameworkRequest.type";
import axios from "axios";
// import { serverApiUrl } from "@/constants/link.constant";
// import { getAccessToken } from "../firebase/auth/GetTokenAuth";

export async function apiGetframeworks(
//   frameworkRequest: FrameworkRequest,
) {
  //   const apiUrl = `${serverApiUrl}/max-frameworks`;
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const apiUrl = `http://localhost:8081/creator/frameworks`;
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
