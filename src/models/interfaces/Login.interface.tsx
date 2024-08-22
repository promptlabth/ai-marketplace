import { UserCredential } from "firebase/auth";

export interface ProfileUser {
    user: UserDetail;
    plan: UserPlan
}

interface UserDetail{
    firebaseId: string;
    name: string;
    email?: string;
    profilePic? :string;
    platform: string;
    stripeId: string;
    balanceMessage: number;
}

interface UserPlan{
    planType: string;
    maxMessages: number;
}

export interface SignInUserCredential extends UserCredential{
    accessToken: string | undefined;
}