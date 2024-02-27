import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./routes/ProtectRoute";
import Users from "./pages/Users/Users";
import { AdminPage } from "./pages/AdminPage";

import useAuthStore from "./store/authStore/authStore";
import Team from "./pages/Team/Team";

export const PrivateRoute = () => {
  const { role } = useAuthStore((state) => state);

  return (
    <Routes>
      <Route
        path="/users"
        element={
          <ProtectedRoute isAllowed={!!role} user={role}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team"
        element={
          <ProtectedRoute isAllowed={!!role} user={role}>
            <Team />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAllowed={!!role && role === "admin"}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
