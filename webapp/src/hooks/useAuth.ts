import { useContext } from "react";
import { AuthUserContext } from "./../contexts/authProvider";

export const useAuth = () => useContext(AuthUserContext);
