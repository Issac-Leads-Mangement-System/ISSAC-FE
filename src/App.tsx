import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Login from "./pages/Login/Login";
import { Drawer } from "./common/utils";
import { PrivateRoute } from "./route";
import ToolbarComponent from "./components/Toolbar/Toolbar";
import LeftMenu from "./components/LeftNavigation/LeftMenu";

import "./App.css";

import useAuthStore from "./store/authStore/authStore";

function App() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { role } = useAuthStore((state) => state);

  const handleLogout = () => {
    useAuthStore.getState().logout();
    localStorage.clear();
    navigate("/");
  };
  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const token: any = localStorage.getItem("authToken");

  const getUser = async () => {
    if (token) {
      const { id }: any = jwtDecode(token);

      try {
        const response = await axios.get(
          `https://issac-service-app-now-7jji5at5aa-ue.a.run.app/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        useAuthStore
          .getState()
          .setUser(response?.data?.id, response?.data?.user_role);
      } catch (error) {
        console.log("get uset error", error);
        //if token is expired redirect the user to the login page
      }
    }
  };

  useEffect(() => {
    //get user
    getUser();
  }, [token]);

  return (
    <>
      {localStorage.getItem("authToken") && (
        <div>
          <Box sx={{ display: "flex" }}>
            <Drawer variant="permanent" open={open}>
              <LeftMenu open={open} />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
              <ToolbarComponent
                handleDrawerOpen={handleDrawerOpen}
                open={open}
                handleLogout={handleLogout}
              />
              {role && <PrivateRoute />}
              {/* loader for get user request */}
            </Box>
          </Box>
        </div>
      )}

      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
