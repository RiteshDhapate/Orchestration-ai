import React, { useEffect } from "react";
import { BrowserRouter, useRoutes, Navigate } from "react-router-dom";
import { useDarkMode } from "./hooks";
//import { Auth0WithRedirectProvider, UserProvider } from "./interfaces";
import Layout from "./pages/Layout";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider, useToken } from "./pages/UserProvider";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./services/store";

const RoutesComponent = () => {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to={"/app"} />,
    },
    { path: "/app/login", element: <Login /> },
    //{ path: "/app/logout", element: <Logout /> },
    {
      path: "/app",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to={"home"} />,
        },
        {
          path: "home",
          element: <ProtectedRoute element={<Home />} />,
        },
      ],
    },
    {
      path: "*",
      children: [
        {
          path: "*",
          element: <PageNotFound code={"404"} />,
        },
      ],
    },
  ]);
};

export const ProtectedRoute = ({ element }) => {
  const token = useToken();
  console.log("token", token);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);

    return () => clearTimeout(timer);
  }, [token]);

  if (isLoading) {
    return <div></div>;
  }

  if (!token) {
    return <Navigate to="/app/login" />;
  }

  return element;
};

function App() {
  useDarkMode();

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="224285579052-i3sop77c283lvht68vfjhiqnp7v58ekq.apps.googleusercontent.com">
        <Provider store={store}>
          <UserProvider>
            <RoutesComponent />
          </UserProvider>
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
