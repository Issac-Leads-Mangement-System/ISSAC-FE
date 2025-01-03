import React from "react";
import { Typography, Box, Chip } from "@mui/material";

const UserChipsExample = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        padding: 1,
      }}
    >
      {/* User section */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#333",
        }}
      >
        User: Barak
      </Typography>

      {/* Chips section */}
      <Box
        sx={{
          display: "flex",
          gap: 1, 
        }}
      >
        {/* Chip Default */}
        <Chip
          label={
            <>
              Default <Typography variant="caption">(id: 1)</Typography>
            </>
          }
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#333",
            fontWeight: "bold",
          }}
          size="small"
        />

        {/* Chip Success */}
        <Chip
          label={
            <>
              Success <Typography variant="caption">(id: 4,5)</Typography>
            </>
          }
          sx={{
            backgroundColor: "#c8f7c5",
            color: "#2d6a4f",
            fontWeight: "bold",
          }}
          size="small"
        />

        {/* Chip Others */}
        <Chip
          label={
            <>
              Others <Typography variant="caption"></Typography>
            </>
          }
          sx={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            fontWeight: "bold",
          }}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default UserChipsExample;
