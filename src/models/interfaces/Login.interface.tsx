import { UserCredential } from "firebase/auth";

export interface ProfileUser {
    user: UserDetail;
    plan: UserPlan
}

export interface UserDetail{
    user: UserDetail;
    plan: UserPlan;
    firebaseId: string;
    name: string;
    email?: string;
    profilePic? :string;
    platform: string;
    stripeId: string;
    balanceMessage: number;
}

export interface UserRegister {
    firebase_id: string
    name : string
    email : string
    platform : string
    stripe_id : string 
    plan_id : string
    profile_pic : string
    access_token : string
}

interface UserPlan{
    planType: string;
    maxMessages: number;
}

export interface SignInUserCredential extends UserCredential{
    accessToken: string | undefined;
}