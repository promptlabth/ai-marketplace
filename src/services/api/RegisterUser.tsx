import axios from 'axios';
import { UserRegister, LoginResponse } from "@/models/interfaces/Login.interface";

export async function RegisterUser(
    data: UserRegister,
    authorizationToken: string
): Promise<LoginResponse> {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`;
    const response = await axios.post<LoginResponse>(apiUrl, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authorizationToken,
        }
    });
    console.log(response);

    return response.data;
}