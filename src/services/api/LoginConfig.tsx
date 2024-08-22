import axios from "axios";

interface APIResponse<T = any> {
    data?: T;
    reply?: string;
}

interface LoginData {
    accessToken: string;
    platform: string;
}
export async function LoginFunction<T = any>(
    data: LoginData, 
    authorizationToken: string
) : Promise<APIResponse<T>> {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`

    try {
        const response = await axios.post(apiUrl, data, {
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authorizationToken,
            }
        });
        if (response.status !== 200){
            return {reply: "Service Error" }
        }

        if (response.data.code === 1000){
            return {data: response.data}
        }
        return {reply: "Error Please try again" }
    }catch (error){
        console.error("Error GetMessages ", error);
        return {reply: "Error Please try again" };
    }
}   