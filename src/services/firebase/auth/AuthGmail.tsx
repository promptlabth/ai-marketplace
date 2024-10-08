import {
    Auth,
    GoogleAuthProvider,
    UserCredential,
    signInWithPopup,
  } from "firebase/auth";
  import { authFirebase } from "../InitialFirebase";
import { SignInUserCredential } from "@/models/interfaces/Login.interface";
  async function signInWithGmail(): Promise<SignInUserCredential | null> {
    try {
      const auth: Auth = authFirebase;
      const googleProvider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      const accessToken: string | undefined =
        GoogleAuthProvider.credentialFromResult(result)?.accessToken;
      return { ...result, accessToken };
    } catch (error: any) {
      console.error("Error signing in with Google:", error);
      return null;
    }
  }
  
  export default signInWithGmail;