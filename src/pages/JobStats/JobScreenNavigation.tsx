import React, { useState } from "react";
import { Box, Button, Typography, Grid, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UserChipsExample from "./JobScreenNavigationUserInfo";

const ScreenNavigationWithGrid = ({
  currentId,
  totalButtons,
  onNext,
  onPrevious,
  onButtonClick,
  isPreviousButtonDisabled,
  isNextButtonDisabled,
}: any) => {
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");

  const handleCopy = () => {
    navigator.clipboard.writeText(currentId).then(() => {
      setTooltipText("Copied!");
      setTimeout(() => setTooltipText("Copy to clipboard"), 2000);
    });
  };

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
      <UserChipsExample/>
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
          disabled={isPreviousButtonDisabled}
          sx={{ minWidth: "120px" }}
        >
          Previous
        </Button>
        {/* <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          ID: {currentId}
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            width: "fit-content",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {currentId}
          </Typography>
          <Tooltip title={tooltipText} arrow>
            <IconButton
              onClick={handleCopy}
              size="small"
              sx={{
                marginLeft: "8px",
                color: "#555",
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={onNext}
          disabled={isNextButtonDisabled}
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
          <Grid item xs={4}>
            <Button
              variant="contained"
              color={"primary"}
              fullWidth
              onClick={() => onButtonClick()}
              sx={{
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              Button
            </Button>
          </Grid>
          {/* {Array.from({ length: totalButtons }).map((_, index) => (
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
          ))} */}
        </Grid>
      </Box>
    </Box>
  );
};

export default ScreenNavigationWithGrid;
