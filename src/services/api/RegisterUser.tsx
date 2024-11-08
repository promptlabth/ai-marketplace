import axios from 'axios';
import { APIResponse } from "./Constant";
import { UserDetail, UserRegister } from "@/models/interfaces/Login.interface";

export async function RegisterUser(
    data: UserRegister,
    authorizationToken: string
): Promise<UserDetail> {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`;
    const response = await axios.post<UserDetail>(apiUrl, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authorizationToken,
        }
    });
    console.log(response);

    return response.data;
}