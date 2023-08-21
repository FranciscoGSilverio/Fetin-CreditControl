import { useState, useEffect, useCallback } from "react";
import type { User } from "firebase/auth";
import { auth as Firebase } from "../services/firebaseConfig";

export type FormattedUserType = {
  photoUrl?: string | undefined | null;
  email?: string | undefined | null;
  name?: string | undefined | null;
  loadingAuthentication?: boolean;
};

const formatAuthUser = (user: User | null): FormattedUserType => ({
  photoUrl: user?.photoURL,
  email: user?.email,
  name: user?.displayName,
});

export function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<FormattedUserType | null>(null);
  const [token, setToken] = useState<string>("");

  const [loadingLogin, setloadingLogin] = useState<boolean>(true);

  const [authenticationFailedAlertState, setAuthenticationFailedAlertState] =
    useState({ state: false, message: "" });

  const clear = useCallback(() => {
    setAuthUser(null);
    setloadingLogin(false);
    setToken("");
  }, [setloadingLogin]);

  const getJwtToken = async () => {
    const token = await Firebase.currentUser?.getIdToken(true);
    return token ? token : "";
  };

  // listen for Firebase state change
  useEffect(() => {
    const authStateChanged = async (authState: User | null) => {
      if (!authState) {
        clear();
        return;
      }

      const formattedUser = formatAuthUser(authState);
      setAuthUser(formattedUser);

      const token = await getJwtToken();
      setToken(token);
    };

    const unsubscribe = Firebase.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, [clear, setloadingLogin]);

  return {
    authenticationFailedAlertState,
    setAuthenticationFailedAlertState,
    authUser,
    loadingLogin,
    token,
    setloadingLogin,
  };
}
