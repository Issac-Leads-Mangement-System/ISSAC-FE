import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteInterface {
  isAllowed: boolean;
  redirectPath?: string;
  children?: any;
}

export const ProtectedRoute: FC<ProtectedRouteInterface> = ({
  isAllowed,
  redirectPath = "/login",
  children,
}) => {
  console.log("isAllowed", isAllowed);
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
