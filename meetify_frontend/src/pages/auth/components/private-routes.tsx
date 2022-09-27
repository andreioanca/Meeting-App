import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import AuthContext from "./auth-provides";

const PrivateRoute = ({ children }: any) => {
  const location = useLocation();
  const { setAuth }: any = useContext(AuthContext);

  const getToken = localStorage.getItem("access_token");

  useEffect(() => {
    const localStorageUserData = JSON.parse(localStorage.getItem("user") || "");

    setAuth({
      access_token: getToken,
      username: localStorageUserData?.name || "",
      email: localStorageUserData?.email,
      roles: localStorageUserData?.roles,
      id: localStorageUserData?.id,
    });
  }, []);

  return getToken ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export { PrivateRoute };
