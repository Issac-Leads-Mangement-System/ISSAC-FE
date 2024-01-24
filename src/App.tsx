import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./pages/Login/Login";
import "./App.css";
import { Drawer } from "./common/utils";
import { PrivateRoute } from "./route";
import ToolbarComponent from "./components/Toolbar/Toolbar";

import LeftMenu from "./components/LeftNavigation/LeftMenu";
import useAuthStore from "./store/authStore/authStore";

function App() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    localStorage.clear();
    navigate("/");
  };
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

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
              <PrivateRoute />
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
