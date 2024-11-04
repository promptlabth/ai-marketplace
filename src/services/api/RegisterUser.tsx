import axios from 'axios';
import { APIResponse } from "./Constant";
import { UserDetail, UserRegister } from "@/models/interfaces/Login.interface";

export async function RegisterUser(
    data: UserRegister ,
    authorizationToken: string
): Promise<APIResponse<UserDetail | undefined>> {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`;
    const response = await axios.post<APIResponse<UserDetail>>(apiUrl, data,{
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authorizationToken,
            // "X-Request-ID" : uuidv4()
        }
    });
    if (response.status !== 200){
        return {error: "Service Error" }
    }

    return response.data;
}