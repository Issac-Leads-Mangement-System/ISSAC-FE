import {
  IconButton,
  Typography,
  Toolbar,
  Box,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import styled from "styled-components";
import { ToolbarStyle } from "./ToolbarStyle";
import { useState } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const settings = ["Logout"];

const ToolbarComponent = ({
  className,
  handleDrawerOpen,
  handleLogout,
  open,
}: any) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Toolbar
      disableGutters
      className={`${className}`}
      style={{
        borderBottom: "1px solid #908f8f40",
        minHeight: "39px",
      }}
    >
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
          }}
        >
          {open ? <MenuOpenIcon /> : <ArrowRightAltIcon />}
        </IconButton>
      </Box>

      <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
          }}
        >
          {open ? <MenuOpenIcon /> : <ArrowRightAltIcon />}
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 0 }}>
        {/* <Tooltip title=""> */}
        <MenuItem>
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0, width: "30px", height: "30px" }}
          >
            <Avatar alt="Memy Sharp" />
          </IconButton>
        </MenuItem>
        {/* </Tooltip> */}
        <Menu
          sx={{ mt: "35px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key={1} onClick={handleLogout}>
            <Stack direction="row" alignItems="center" gap={1}>
              <LogoutIcon sx={{ fontSize: "15px" }} />
              <Typography sx={{ textAlign: "center", fontSize: "13px" }}>
                Log out
              </Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
};

export default styled(ToolbarComponent)`
  ${ToolbarStyle}
`;
