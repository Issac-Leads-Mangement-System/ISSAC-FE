import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "./routes/ProtectRoute";
import { AdminPage } from "./pages/AdminPage";
import Team from "./pages/Team/Team";
import Leads from "./pages/Leads/Leads";
import LeadsTypes from "./pages/Leads/LeadsTypes";

import useAuthStore from "./store/authStore/authStore";
import LeadsStatus from "./pages/Leads/LeadsStatus";
import { Users } from "./pages/Users/Users";
import Jobs from "./pages/Jobs/Jobs";
import AddJobs from "./pages/addJob/addJobs";
import { JobStats } from "./pages/JobStats/JobStats";

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
      <Route
        path="/leads"
        element={
          <ProtectedRoute isAllowed={!!role} user={role}>
            <Leads />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads-types"
        element={
          <ProtectedRoute isAllowed={!!role} user={role}>
            <LeadsTypes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads-status"
        element={
          <ProtectedRoute isAllowed={!!role} user={role}>
            <LeadsStatus />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <ProtectedRoute isAllowed={!!role} user={role}>
            <Jobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-job"
        element={
          <ProtectedRoute isAllowed={!!role} user={role}>
            <AddJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/job/:jobId/stats"
        element={
          <ProtectedRoute isAllowed={!!role} user={role}>
            <JobStats />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
