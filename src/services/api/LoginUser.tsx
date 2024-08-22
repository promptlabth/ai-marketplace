import { ProfileUser } from "@/models/interfaces/Login.interface";
import axios from "axios";
import { APIResponse } from "./Constant";
import { randomUUID } from "crypto";



interface LoginData {
    accessToken: string;
    platform: string;
}
export async function LoginFunction(
    data: LoginData, 
    authorizationToken: string
) : Promise<APIResponse<ProfileUser>> {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`

    try {
        const response = await axios.post(apiUrl, data, {
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authorizationToken,
                "X-Request-ID" : randomUUID()
            }
        });
        if (response.status !== 200){
            return {error: "Service Error" }
        }

        if (response.data.code === 1000){
            return {data: response.data}
        }
        return {error: "Error Please try again" }
    }catch (error){
        console.error("Error GetMessages ", error);
        return {error: "Error Please try again" };
    }
}   