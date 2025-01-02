import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";

const ScreenNavigationWithGrid = ({
  currentId,
  totalButtons,
  onNext,
  onPrevious,
  onButtonClick,
}: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // height: "100vh",
        padding: "16px",
        backgroundColor: "#f9fafc",
      }}
    >
      {/* Header cu butoanele Previous și Next */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          // maxWidth: "600px",
          marginBottom: "32px",
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={onPrevious}
          disabled={currentId === 1}
          sx={{ minWidth: "120px" }}
        >
          Previous
        </Button>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          ID: {currentId}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={onNext}
          disabled={currentId === totalButtons}
          sx={{ minWidth: "120px" }}
        >
          Next
        </Button>
      </Box>

      {/* Grila de butoane */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "medium",
            color: "#555",
            marginBottom: "16px",
          }}
        >
          Select an Option
        </Typography>
        <Grid container spacing={2}>
          {Array.from({ length: totalButtons }).map((_, index) => (
            <Grid item xs={4} key={index}>
              <Button
                variant="contained"
                color={index + 1 === currentId ? "secondary" : "primary"}
                fullWidth
                onClick={() => onButtonClick(index + 1)}
                sx={{
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                Button {index + 1}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ScreenNavigationWithGrid;
