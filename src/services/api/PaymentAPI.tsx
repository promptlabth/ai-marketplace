import axios from "axios";
import { CheckoutSessionRequest } from "@/models/types/requests/paymentRequest.type";
import  { paymentApiUrl } from "@/constants/link.constant";
import { getAccessToken } from "../firebase/auth/GetTokenAuth";
import { Content } from "next/font/google";

export async function apiGetCheckoutSessionUrl(
    checkoutSessionRequest: CheckoutSessionRequest,
  ) {
    const apiUrl = `${paymentApiUrl}/subscription/get-url`;
    try {
      const accessToken = await getAccessToken();

      const requestOption = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      };
  
      const response = await axios.post(
        apiUrl,
        checkoutSessionRequest,
        requestOption,
      );
  
      if (response.status != 201) {

        return;
      }
      console.log("Response:", response.data);

      return response.data.url;

      // Local Test //

      // const requestOption = {
      //   method: "POST", // HTTP method
      //   headers: {
      //     "Content-Type": "application/json", // Specify JSON content type
      //     Authorization: `Bearer ${accessToken}`, // Add the access token
      //   },
      //   body: JSON.stringify(checkoutSessionRequest), // Convert the request body to JSON
      // };
  
      // console.log("Request Options:", requestOption);

      // console.log("Sending request...",);
  
      // const response = await fetch(apiUrl, requestOption);

      // if (!response.ok) {
      //   // Optional: log and throw if the response is not successful
      //   console.error("Request failed:", response.status, await response.text());
      //   throw new Error("Failed to fetch data");
      // }
    

      // return response.json()

      // End of Local Test //

    } catch (error) {
      console.error("Error Occured:", error);
      return "";
    }
  }

  export async function apiGetOneTimeCheckoutSessionUrl(
    checkoutSessionRequest: CheckoutSessionRequest,
  ) {
    const apiUrl = `${paymentApiUrl}/subscription/get-one-time-url`;
    try {
      const accessToken = await getAccessToken();

      const requestOption = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Origin:"http://localhost:3000"
        }
      };
  
      const response = await axios.post(
        apiUrl,
        checkoutSessionRequest,
        requestOption,
      );

      // const response = await axios.post(
      //   'http://localhost:4000/proxy/subscription',
      //   checkoutSessionRequest,
      //   requestOption
      // );
      
  
      if (response.status != 201) {

        return;
      }
      console.log("Response:", response.data);

      return response.data.url;

      // Local Test //

      // const requestOption = {
      //   method: "POST", // HTTP method
      //   headers: {
      //     "Content-Type": "application/json", // Specify JSON content type
      //     Authorization: `Bearer ${accessToken}`, // Add the access token
      //   },
      //   body: JSON.stringify(checkoutSessionRequest), // Convert the request body to JSON
      // };
  
      // console.log("Request Options:", requestOption);

      // console.log("Sending request...",);
  
      // const response = await fetch(apiUrl, requestOption);

      // if (!response.ok) {
      //   // Optional: log and throw if the response is not successful
      //   console.error("Request failed:", response.status, await response.text());
      //   throw new Error("Failed to fetch data");
      // }
    

      // return response.json()

      // End of Local Test //

    } catch (error) {
      console.error("Error Occured:", error);
      return "";
    }
  }