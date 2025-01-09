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

export const PropertiesSection = ({ formProps }: any) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <Paper elevation={3} sx={{ p: 3, m: 2, borderRadius: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Properties
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Grid2 container spacing={2}>
              <Grid2 size={12}>
                {/* <TextField
                label="Package name"
                variant="outlined"
                fullWidth
              /> */}
                <Input
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_properties.order_package_id"
                  )}
                  label="Package name"
                  style={{ display: "flex" }}
                />
              </Grid2>
              <Grid2 size={4}>
                {/* <TextField label="Price" variant="outlined" fullWidth /> */}
                <Input
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_properties.order_monthly_price"
                  )}
                  label="Price"
                  style={{ display: "flex" }}
                />
              </Grid2>

              <Grid2 size={4}>
                {/* <TextField
                  label="Installation price"
                  variant="outlined"
                  fullWidth
                /> */}

                <Input
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_properties.order_installation_price"
                  )}
                  label="Installation price"
                  style={{ display: "flex" }}
                />
              </Grid2>

              <Grid2 size={4}>
                {/* <TextField label="Payments" variant="outlined" fullWidth /> */}
                <Input
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_properties.order_installation_payments"
                  )}
                  label="Payments"
                  style={{ display: "flex" }}
                />
              </Grid2>

              <Grid2 size={4}>
                {/* <TextField label="Streamers" variant="outlined" fullWidth /> */}
                <Input
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_properties.tv_streamers"
                  )}
                  label="Streamers"
                  style={{ display: "flex" }}
                />
              </Grid2>

              <Grid2 size={4}>
                {/* <TextField label="Users" variant="outlined" fullWidth /> */}
                <Input
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_properties.tv_users"
                  )}
                  label="Users"
                  style={{ display: "flex" }}
                />
              </Grid2>

              <Grid2 size={4}>
                {/* <TextField label="Wifi" variant="outlined" fullWidth /> */}
                <Input
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_properties.wifi_extenders"
                  )}
                  label="Wifi"
                  style={{ display: "flex" }}
                />
              </Grid2>

              <Grid2 size={12}>
                {/* <TextField label="Comments" variant="outlined" fullWidth /> */}
                <Input
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_properties.orders_tv_properties_comment"
                  )}
                  label="Comments"
                  style={{ display: "flex" }}
                />
              </Grid2>
            </Grid2>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
