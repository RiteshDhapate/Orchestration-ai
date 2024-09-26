import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../hooks";
import {
  setToken as setReduxToken,
  setClientToken as setReduxClientToken,
} from "../services/slices";
import { useGoogleLogin } from "@react-oauth/google";

export const UserContext = createContext();

export const useToken = () => {
  const { token } = useContext(UserContext);
  return token;
};

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage("token", null);
  const [tempToken, setTempToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedClientToken = localStorage.getItem("clientToken");
    if (storedToken) {
      setToken(storedToken); // Ensure the stored token is set as a string
      dispatch(setReduxToken(storedToken));
      dispatch(setReduxClientToken(storedClientToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setToken]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, [setUser]);

  const handleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { code } = codeResponse;
        const response = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
            redirect_uri: window.location.origin, // The URI you set in Google console
            grant_type: "authorization_code",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to exchange code for tokens");
        }

        const data = await response.json();
        const token = data.id_token;

        setUser(data);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data));

        if (token) {
          navigate("/"); // Navigate once the token is successfully obtained
        } else {
          alert("Invalid username or password");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    flow: "auth-code",
    accessType: "offline",
    expiresIn: 12 * 60 * 60,
  });

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/app/login");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        tempToken,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
