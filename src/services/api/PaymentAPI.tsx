import axios from "axios";
import { CheckoutSessionRequest } from "@/models/types/requests/paymentRequest.type";
import  { paymentApiUrl } from "@/constants/link.constant";
import { getAccessToken } from "../firebase/auth/GetTokenAuth";

export async function apiGetCheckoutSessionUrl(
    checkoutSessionRequest: CheckoutSessionRequest,
  ) {
    const apiUrl = `${paymentApiUrl}/subscription/get-url`;
    try {
      const accessToken = await getAccessToken();
      // const requestOption = {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   }
      // };
  
      // const response = await axios.post(
      //   apiUrl,
      //   checkoutSessionRequest,
      //   requestOption,
      // );
  
      // if (response.status != 201) {

      //   return;
      // }
      // console.log("Response:", response.data);

      // return response.data.url;

      // Local Test //

      const requestOption = {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
          Authorization: `Bearer ${accessToken}`, // Add the access token
        },
        body: JSON.stringify(checkoutSessionRequest), // Convert the request body to JSON
      };
  
      // console.log("Request Options:", requestOption.body);

      console.log("Sending request...",);
  
      // Make the fetch request
      const response = await fetch(apiUrl, requestOption);

      return response.json()

      // End of Local Test //

    } catch (error) {
      console.error("Error Occured:", error);
      return "";
    }
  }