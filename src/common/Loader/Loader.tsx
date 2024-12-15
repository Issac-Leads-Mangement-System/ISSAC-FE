import { Box, CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(5px)",
        zIndex: 9999, // Asigură-te că overlay-ul este deasupra altor elemente
        pointerEvents: "none", // Dezactivează interacțiunile pentru elementele de dedesubt
      }}
    >
      <CircularProgress sx={{ color: "#000000d4" }} />
    </Box>
  );
};
