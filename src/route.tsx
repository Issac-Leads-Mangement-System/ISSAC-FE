import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectRoute";
import Users from "./pages/Users/Users";
import { AdminPage } from "./pages/AdminPage";

export const RouteC = ({ user }: any) => {
  return (
    <Routes>
      <Route
        path="/users"
        element={
          <ProtectedRoute isAllowed={!!user} user={user}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute
            isAllowed={!!user && user.permissions.includes("analyze")}
          >
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
