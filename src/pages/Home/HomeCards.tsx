import { Box, Card, Grid2, Typography } from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

export const HomeCards = () => {
  return (
    <>
      {/* Card 1 */}
      <Grid2>
        <Card
          sx={{
            transition: "all 0.4s",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-2px)",
            },
            width: "250px",
            height: "120px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          {/* Conținutul din stânga */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "medium",
                color: "#333",
                marginBottom: "8px",
              }}
            >
              Total
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              0
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
              }}
            >
              employee:
            </Typography>
          </Box>

          {/* Iconul din dreapta */}
          <Box
            sx={{
              backgroundColor: "#eaeafd8a", // Roz pal
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SupervisedUserCircleIcon
              sx={{ fontSize: 30, fontWeight: "medium" }}
            />{" "}
            {/* Icon roșu */}
          </Box>
        </Card>
      </Grid2>

      {/* Card 2 */}

      <Grid2>
        <Card
          sx={{
            transition: "all 0.4s",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-2px)",
            },
            width: "250px",
            height: "120px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          {/* Conținutul din stânga */}
          <Box>
            <Typography
              variant="body1"
              color={"#856404"}
              sx={{
                fontWeight: "medium",
                color: "#5a5a5a",
                marginBottom: "8px",
              }}
            >
              Open
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              0
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
              }}
            >
              employee:
            </Typography>
          </Box>

          {/* Iconul din dreapta */}
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
            />{" "}
            {/* Icon roșu */}
          </Box>
        </Card>
      </Grid2>

      {/* Card 3 */}
      <Grid2>
        <Card
          sx={{
            transition: "all 0.4s",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-2px)",
            },
            width: "250px",
            height: "120px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          {/* Conținutul din stânga */}
          <Box>
            <Typography
              variant="body1"
              color={"#856404"}
              sx={{
                fontWeight: "medium",
                color: "#155724",
                marginBottom: "8px",
              }}
            >
              Success
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#155724",
              }}
            ></Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
              }}
            >
              employee:
            </Typography>
          </Box>

          {/* Iconul din dreapta */}
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
            />{" "}
            {/* Icon roșu */}
          </Box>
        </Card>
      </Grid2>

      {/* Card 4 */}

      <Grid2>
        <Card
          sx={{
            transition: "all 0.4s",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-2px)",
            },
            width: "250px",
            height: "120px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          {/* Conținutul din stânga */}
          <Box>
            <Typography
              variant="body1"
              color={"#856404"}
              sx={{
                fontWeight: "medium",
                color: "red",
                marginBottom: "8px",
              }}
            >
              Closed
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              0
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
              }}
            >
              employee:
            </Typography>
          </Box>

          {/* Iconul din dreapta */}
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
            />{" "}
            {/* Icon roșu */}
          </Box>
        </Card>
      </Grid2>

      {/* Card 5 */}

      <Grid2>
        <Card
          sx={{
            transition: "all 0.4s",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              transform: "translateY(-2px)",
            },
            width: "250px",
            height: "120px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          {/* Conținutul din stânga */}
          <Box>
            <Typography
              variant="body1"
              color={"#856404"}
              sx={{
                fontWeight: "medium",
                color: "#1976d280",
                marginBottom: "8px",
              }}
            >
              Mobile
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              0
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
              }}
            >
              mobile:
            </Typography>
          </Box>

          {/* Iconul din dreapta */}
          <Box
            sx={{
              backgroundColor: "#d2e3f480", // Roz pal
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PhoneAndroidIcon
              sx={{
                fontSize: 30,
                fontWeight: "medium",
                color: "#1976d280",
              }}
            />{" "}
            {/* Icon roșu */}
          </Box>
        </Card>
      </Grid2>
    </>
  );
};
