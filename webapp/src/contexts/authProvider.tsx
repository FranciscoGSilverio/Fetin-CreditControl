import { createContext, ReactNode, FC } from "react";
import { useFirebaseAuth, FormattedUserType } from "../hooks/useFirebaseUser";

type AutenticationFailedType = {
  state: boolean;
  message: string;
};

type UserContextType = {
  authUser: FormattedUserType | null;
  loadingLogin: boolean;
  setloadingLogin: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  authenticationFailedAlertState: AutenticationFailedType;
  setAuthenticationFailedAlertState: React.Dispatch<
    React.SetStateAction<AutenticationFailedType>
  >;
};

export const AuthUserContext = createContext<UserContextType>({
  authUser: null,
  loadingLogin: true,
  setloadingLogin: (prevState) => {
    return prevState;
  },
  token: "",
  authenticationFailedAlertState: { state: false, message: "" },
  setAuthenticationFailedAlertState: (prevState) => {
    return prevState;
  },
});

export const AuthUserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};
