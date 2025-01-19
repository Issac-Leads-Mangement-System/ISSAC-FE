import { Typography, Toolbar, Box, AppBar } from "@mui/material";
import styled from "styled-components";
import { SecondToolbarStyle } from "./SecondToolbarStyle";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";

const SecondToolbarComponent = ({ className }: any) => {
  const { name, path } = secondToolbarStore();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          disableGutters
          className={`${className}`}
          style={{
            borderBottom: "1px solid #908f8f40",
            minHeight: "40px",
            background: "white",
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ flexGrow: 1, color: "black", mr: 2, fontWeight: "bold" }}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "#878a99", ml: 2 }}
          >
            {path}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default styled(SecondToolbarComponent)`
  ${SecondToolbarStyle}
`;
