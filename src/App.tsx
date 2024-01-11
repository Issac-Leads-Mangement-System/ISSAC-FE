import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./pages/Login/Login";
import "./App.css";
import { Drawer } from "./common/utils";
import { RouteC } from "./route";
import ToolbarComponent from "./components/Toolbar/Toolbar";

import LeftMenu from "./components/LeftNavigation/LeftMenu";

function App() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {localStorage.getItem("issac_signIn") === "signIn" && (
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
              <RouteC user={user} />
            </Box>
          </Box>
        </div>
      )}

      <Routes>
        <Route index element={<Login setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
