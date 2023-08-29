import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

export const signInUser = (
  email: string,
  password: string,
  errorCallback: () => void
) => {
  signInWithEmailAndPassword(auth, email, password).catch(() =>
    errorCallback()
  );
};
export const signOutUser = () => signOut(auth);
