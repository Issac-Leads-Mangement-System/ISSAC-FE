import { Box, Grid2, Paper, TextField, Typography } from "@mui/material";
import Input from "../../../common/Input/Input";
import { generateFormikInputFieldProps } from "../../../forms/formikHelper";

export const InformationSection = ({ formProps }: any) => {
  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, m: 2, borderRadius: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Customer Information
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Grid2 container spacing={1.5}>
            <Grid2 size={6}>
              {/* <TextField label="Customer ID" variant="outlined" fullWidth /> */}
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_id"
                )}
                label="Customer ID"
                style={{ display: "flex" }}
              />
            </Grid2>

            <Grid2 size={6}>
              {/* <TextField
                label="Customer Full Name"
                variant="outlined"
                fullWidth
              /> */}
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_full_name"
                )}
                label="Customer Full Name"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={4}>
              {/* <TextField label="Phone" variant="outlined" fullWidth /> */}
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_phone"
                )}
                label="Phone"
                style={{ display: "flex" }}
              />
            </Grid2>

            <Grid2 size={4}>
              {/* <TextField label="Phone 2" variant="outlined" fullWidth /> */}
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_phone_2"
                )}
                label="Phone 2"
                style={{ display: "flex" }}
              />
            </Grid2>

            <Grid2 size={4}>
              {/* <TextField label="Home Phone" variant="outlined" fullWidth /> */}
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_phone_home"
                )}
                label="Phone home"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={4}>
              {/* <TextField label="City" variant="outlined" fullWidth /> */}
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_city"
                )}
                label="City"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={4}>
              {/* <TextField label="Street" variant="outlined" fullWidth /> */}
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_street"
                )}
                label="Street"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={2}>
              {/* <TextField label="Home Number" variant="outlined" fullWidth /> */}
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_home_number"
                )}
                label="Home Number"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={2}>
              {/* <TextField
                label="Apartment Number"
                variant="outlined"
                fullWidth
              /> */}
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_apartment_number"
                )}
                label="Apartment Number"
                style={{ display: "flex" }}
              />
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Box>
  );
};
