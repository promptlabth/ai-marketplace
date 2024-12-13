import { UserCredential } from "firebase/auth";

export interface ProfileUser {
    user: UserDetail;
}

export interface UserDetail {
    id: number;
    firebase_id: string;
    access_token: string;
    email: string | undefined;
    name: string;
    plan_id: string | undefined;
    platform: string;
    profile_pic: string;
}

export interface UserRegister {
    firebase_id: string;
    name: string;
    email: string;
    platform: string;
    stripe_id: string;
    plan_id: string;
    profile_pic: string;
    access_token: string;
}

interface UserPlan {
    planType: string;
    maxMessages: number;
}

export interface SignInUserCredential extends UserCredential {
    accessToken: string | undefined;
}

export interface LoginResponse {
    token: string;
    user: UserDetail;
}