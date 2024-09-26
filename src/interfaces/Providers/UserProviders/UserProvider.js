import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { useLocalStorage } from "../../../hooks";

export const UserContext = React.createContext({
  user: null,
  token: "",
  logoutUser: () => {},
});

export function UserProvider({ children }) {
  const [token, setToken] = useLocalStorage("accessToken", null);

  const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const updateUser = async () => {
      if (!isAuthenticated) return;
      const accessToken = await getAccessTokenSilently();
      setToken(`Bearer ${accessToken}`);
    };
    updateUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const logoutUser = () => {
    // Perform Auth0 sign out
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const contextValue = {
    user,
    token,
    logoutUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
