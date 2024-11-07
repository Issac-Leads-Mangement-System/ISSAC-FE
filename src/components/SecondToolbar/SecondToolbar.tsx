import { Typography, Toolbar, Box, AppBar } from "@mui/material";
import styled from "styled-components";
import { SecondToolbarStyle } from "./ToolbarStyle";
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
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1, color: 'black', ml:2 }}>{name}</Typography>
          <Typography variant="subtitle1" component="div" sx={{ color: '#878a99', mr: 2 }}>{path}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default styled(SecondToolbarComponent)`
  ${SecondToolbarStyle}
`;
