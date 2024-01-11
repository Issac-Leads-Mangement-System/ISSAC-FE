import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteInterface {
  isAllowed: boolean;
  redirectPath?: string;
  children?: any;
  user?: any;
}

export const ProtectedRoute: FC<ProtectedRouteInterface> = ({
  isAllowed,
  redirectPath = "/",
  children,
  user,
}) => {
  let statusLogin = localStorage.getItem("issac_signIn");
  // console.log("isAllowed", isAllowed, user, statusLogin);
  if (!isAllowed && statusLogin !== "signIn") {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
