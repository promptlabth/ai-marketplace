import {
  Auth,
  FacebookAuthProvider,
  UserCredential,
  signInWithPopup,
} from "firebase/auth";
import { authFirebase } from "../InitialFirebase";
import { SignInUserCredential } from "@/models/interfaces/Login.interface";


async function signInWithFacebook(): Promise<SignInUserCredential | null> {
  try {
    const auth: Auth = authFirebase;
    const provider = new FacebookAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const accessToken: string | undefined =
      FacebookAuthProvider.credentialFromResult(result)?.accessToken;
    return { ...result, accessToken };
  } catch (error: any) {
    console.error("Error signing in with Facebook:", error);
    return null;
  }
}
export default signInWithFacebook;