import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";

export const signInUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

export const signOutUser = () =>
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
