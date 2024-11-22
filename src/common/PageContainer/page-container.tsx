import { Box } from "@mui/material";

export const PageContainer = ({ children }: any) => {
  return (
    <Box
      sx={{
        marginRight: "15px",
        marginLeft: "15px",
        marginTop: "15px",
        marginBottom: "15px",
        backgroundColor: "white",
        borderRadius: " 0.25rem",
      }}
    >
      {children}
    </Box>
  );
};
