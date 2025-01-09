import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Input from "../../../common/Input/Input";
import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export const PaymentSection = ({ formProps }: any) => {
  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, m: 2, borderRadius: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Customer Payment
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_payment.order_card_number"
                )}
                label="Card number"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Expired date"
                  views={["month", "year"]}
                  format="MM/YY"
                  onChange={(newValue) => {
                    const formattedValue = dayjs(newValue).format("MM/YY");
                    formProps.setFieldValue(
                      "order_customer_payment.order_card_expired_date",
                      formattedValue
                    );
                  }}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={4}>
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_payment.order_card_cvv"
                )}
                label="CVV"
                style={{ display: "flex" }}
              />
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Box>
  );
};
