import React from "react";
import { Typography, Box, Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const UserChipsExample = ({
  jobDetailsById,
  jobLeadsByIdLength,
  step,
}: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
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
        {jobDetailsById.user.first_name} - {jobDetailsById.user.last_name}
      </Typography>
      <Box>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4px 12px",
            backgroundColor: "#f5f5f5",
            borderRadius: "16px",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#1976d2",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            marginRight: "40px"
          }}
        >
          <Typography
            component="span"
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {step}
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "#555",
              margin: "0 6px",
              fontSize: "14px",
            }}
          >
            /
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "#555",
              fontWeight: "medium",
              fontSize: "16px",
            }}
          >
            {jobLeadsByIdLength}
          </Typography>
        </Box>
      </Box>

      {/* Chips section */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        {/* Chip Default */}
        {jobDetailsById.lead_status.lead_status_id === 1 && (
          <Box
          sx={{
            backgroundColor: "#eaf1fd", // Roz pal
            borderRadius: "8px",
            padding: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PlayCircleOutlineIcon
            sx={{ fontSize: 30, fontWeight: "medium", color: "#5a5a5a" }}
          />
          <Chip
            label={<>Open</>}
            sx={{
              backgroundColor: "#eaf1fd",
              color: "#333",
              fontWeight: "bold",
            }}
            size="small"
          />
          {/* Icon roșu */}
        </Box>
          
        )}

        {/* Chip Success */}
        {[4, 5].includes(jobDetailsById.lead_status.lead_status_id) && (
          <Box
            sx={{
              backgroundColor: "#e5f9df", // Roz pal
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 30, fontWeight: "medium", color: "#155724" }}
            />
            <Chip
              label={<>Success</>}
              sx={{
                backgroundColor: "#e5f9df",
                color: "#2d6a4f",
                fontWeight: "bold",
              }}
              size="small"
            />
            {/* Icon roșu */}
          </Box>
        )}

        {/* Chip Others */}
        {![1, 4, 5].includes(jobDetailsById.lead_status.lead_status_id) && (
          <Box
          sx={{
            backgroundColor: "#fdecea", // Roz pal
            borderRadius: "8px",
            padding: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BlockIcon
            sx={{ fontSize: 30, fontWeight: "medium", color: "red" }}
          />
           <Chip
            label={<>Closed</>}
            sx={{
              backgroundColor: "#fdecea",
              color: "#721c24",
              fontWeight: "bold",
            }}
            size="small"
          />
        </Box>

         
        )}
      </Box>
    </Box>
  );
};

export default UserChipsExample;
