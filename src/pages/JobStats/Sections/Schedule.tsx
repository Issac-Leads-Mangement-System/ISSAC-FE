import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export const ScheduleSection = ({formProps}: any) => {
  return (
    <Box>
      <Paper elevation={4} sx={{ p: 3, m: 2, borderRadius: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Schedule
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}></Box>
      </Paper>
    </Box>
  );
};
