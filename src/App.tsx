import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
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
import SecondToolbar from "./components/SecondToolbar/SecondToolbar";
import { Toaster } from "./common/Toaster/Toaster";
import { Theme } from "./theme/Theme";
import usersStore from "./store/Users/users-store";

function App() {
  const { setUserData } = usersStore();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { role } = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setLoading(false);
          useAuthStore
            .getState()
            .setUser(response?.data?.id, response?.data?.user_role);
            setUserData(response.data)
        }
      } catch (error) {
        setLoading(false);
        console.error("get uset error", error);
        localStorage.clear();
        navigate("/");
        //if token is expired redirect the user to the login page
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <ThemeProvider theme={Theme}>
      {localStorage.getItem("authToken") && (
        <div>
          <Box sx={{ display: "flex" }}>
            <Drawer variant="permanent" open={open}>
              <LeftMenu open={open} />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, width: "80%" }}>
              <Box>
                <ToolbarComponent
                  handleDrawerOpen={handleDrawerOpen}
                  open={open}
                  handleLogout={handleLogout}
                />
                <SecondToolbar />
              </Box>
              <Box>{role && <PrivateRoute />}</Box>
            </Box>
          </Box>
        </div>
      )}
      <Toaster />

      <Routes>
        <Route index element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
