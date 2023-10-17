import { createContext, useState } from "react";
import { ChildrenType } from "../types/children";
import { AuthContextType } from "../types/auth-context";
import { TOKEN } from "../constants";

export const AuthContext = createContext({} as AuthContextType);

const AuthContextProvider = ({ children }: ChildrenType) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem(TOKEN))
  );

  const state = { isAuthenticated, setIsAuthenticated };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
