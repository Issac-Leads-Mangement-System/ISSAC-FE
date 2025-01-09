import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import dayjs from "dayjs";

export const ScheduleSection = ({ formProps }: any) => {
  const supplyTimeRange = [
    "07:30-09:00",
    "09:00-11:00",
    "11:00-13:00",
    "13:00-15:00",
    "15:00-17:00",
    "17:00-19:00",
  ];
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
        <Box display="flex" flexDirection="column" gap={2}>
          <Grid2 container spacing={1.5}>
            <Grid2 size={7}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]} sx={{ p: 0, m: 0 }}>
                  <DatePicker
                    label="Supply date"
                    onChange={(newValue) => {
                      const formattedValue =
                        dayjs(newValue).format("DD-MM-YYYY");
                      formProps.setFieldValue(
                        "order_schedule.order_supply_date",
                        formattedValue
                      );
                    }}
                    sx={{ width: "100%" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={5}>
              <FormControl fullWidth>
                <InputLabel id="supply_time_range">
                  Supply time range
                </InputLabel>
                <Select
                  labelId="supply_time_range"
                  id="supply_time_range"
                  label="Supply time range"
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_schedule.order_supply_time_range"
                  )}
                >
                  {supplyTimeRange?.map((timeRange: any) => (
                    <MenuItem key={crypto.randomUUID()} value={timeRange}>
                      {timeRange}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_schedule.order_supply_comment"
                )}
                placeholder="Supply comment"
                multiline
                rows={8}
                maxRows={15}
              />
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Box>
  );
};
