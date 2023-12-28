import { Link, Route, Routes, createBrowserRouter } from "react-router-dom";

import { Login } from "./pages/Login";
import "./App.css";
import { useState } from "react";
import { ProtectedRoute } from "./routes/ProtectRoute";
import { Users } from "./pages/Users";
import { AdminPage } from "./pages/AdminPage";

function App() {
  const [user, setUser] = useState<any>(null);

  const handleLogin = () =>
    setUser({
      id: "1",
      name: "robin",
      permissions: ["analyze"],
      roles: ["admin"],
    });
  const handleLogout = () => setUser(null);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "12px 24px",
        }}
      >
        {user && <Navigation />}
        {user ? (
          <button onClick={handleLogout}>Sign Out</button>
        ) : (
          <button onClick={handleLogin}>Sign In</button>
        )}
      </div>

      <Routes>
        <Route index element={<Login />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute isAllowed={!!user}>
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
    </>
  );
}

const Navigation = () => (
  <nav>
    <Link to="/users" style={{ margin: 4 }}>
      Users
    </Link>
    <Link to="/admin">Admin</Link>
  </nav>
);

export default App;
