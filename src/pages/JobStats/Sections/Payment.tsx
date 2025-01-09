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
              {/* <TextField label="Card number" variant="outlined" fullWidth /> */}
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
              {/* <TextField label="Expired" variant="outlined" fullWidth /> */}
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_payment.order_card_expired_date"
                )}
                label="Expired"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={4}>
              {/* <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                slotProps={{
                  htmlInput: {
                    maxLength: 3, // Limitează lungimea la 3 caractere
                    inputMode: "numeric",
                  },
                }}
              /> */}

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
