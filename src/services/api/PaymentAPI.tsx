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
      const requestOption = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
  
      const response = await axios.post(
        apiUrl,
        checkoutSessionRequest,
        requestOption,
      );
  
      if (response.status != 201) {

        return;
      }
      return response.data.url;
    } catch (error) {
  
      console.error(error);
      return "";
    }
  }