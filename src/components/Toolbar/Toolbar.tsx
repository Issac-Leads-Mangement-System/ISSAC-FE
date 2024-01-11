import { IconButton, Typography, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import { ToolbarStyle } from "./ToolbarStyle";

const ToolbarComponent = ({
  className,
  handleDrawerOpen,
  handleLogout,
  open,
}: any) => {
  return (
    <Toolbar
      className={`${className}`}
      style={{
        borderBottom: "1px solid #908f8f40",
        minHeight: "39px",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: 5,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div"></Typography>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ marginLeft: "auto" }}
        onClick={handleLogout}
      >
        Log out
      </Typography>
    </Toolbar>
  );
};

export default styled(ToolbarComponent)`
  ${ToolbarStyle}
`;
