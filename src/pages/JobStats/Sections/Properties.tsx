import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Input from "../../../common/Input/Input";
import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import ordersStore from "../../../store/Orders/orders-store";
import { FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export const PropertiesSection = ({ formProps, createOrderType }: any) => {
  const { orders } = ordersStore();
  const orderInstallationPayments = [1, 12, 36];
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
                <FormControl fullWidth>
                  <InputLabel id="package_name">Package name</InputLabel>
                  <Select
                    labelId="package_name"
                    id="package_name"
                    label="Package name"
                    {...generateFormikInputFieldProps(
                      formProps,
                      "order_properties.order_package_id"
                    )}
                  >
                    {orders?.map((order: any) => (
                      <MenuItem key={crypto.randomUUID()} value={order.id}>
                        {order.package_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>
              {createOrderType === "TV" && (
                <>
                  <Grid2 size={4}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        "order_properties.order_monthly_price"
                      )}
                      label="Price"
                      style={{ display: "flex" }}
                      regex={/^\d*\.?\d*$/}
                      inputTypeRegex={"decimal"}
                    />
                  </Grid2>

                  <Grid2 size={4}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        "order_properties.order_installation_price"
                      )}
                      label="Installation price"
                      style={{ display: "flex" }}
                      regex={/^\d*\.?\d*$/}
                      inputTypeRegex={"decimal"}
                    />
                  </Grid2>

                  <Grid2 size={4}>
                    <FormControl fullWidth>
                      <InputLabel id="payments">Payments</InputLabel>
                      <Select
                        labelId="payments"
                        id="payments"
                        label="Payments"
                        {...generateFormikInputFieldProps(
                          formProps,
                          "order_properties.order_installation_payments"
                        )}
                      >
                        {orderInstallationPayments?.map((order: any) => (
                          <MenuItem key={crypto.randomUUID()} value={order}>
                            {order}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>

                  <Grid2 size={4}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        "order_properties.tv_streamers"
                      )}
                      label="Streamers"
                      style={{ display: "flex" }}
                      regex={/^\d*$/}
                      inputTypeRegex={"numeric"}
                    />
                  </Grid2>

                  <Grid2 size={4}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        "order_properties.tv_users"
                      )}
                      label="Users"
                      style={{ display: "flex" }}
                      regex={/^\d*$/}
                      inputTypeRegex={"numeric"}
                    />
                  </Grid2>

                  <Grid2 size={4}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        "order_properties.wifi_extenders"
                      )}
                      label="Wifi"
                      style={{ display: "flex" }}
                      regex={/^\d*$/}
                      inputTypeRegex={"numeric"}
                    />
                  </Grid2>
                </>
              )}

              {/* {createOrderType === "mobile" && (
                <>
                  <FieldArray name="order_phone_numbers">
                    {({ push, remove }) => (
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Phone numbers
                        </Typography>

                        {formProps.values.order_properties.order_phone_numbers.map(
                          (_: any, index: any) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 2,
                              }}
                            >
                              <TextField
                                fullWidth
                                label={`Phone number ${index + 1}`}
                                onChange={(e) => {
                                  const newPhoneNumbers = [...formProps.values.order_phone_numbers]; // Creezi o copie a array-ului
                                  newPhoneNumbers[index] = e.target.value; // Actualizezi elementul specific
                                  formProps.setFieldValue("order_phone_numbers", newPhoneNumbers); // Setezi array-ul actualizat
                                }}
                              />

                              <IconButton
                                color="error"
                                onClick={() => remove(index)}
                                disabled={
                                  formProps.values.order_properties.order_phone_numbers
                                    .length === 1
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          )
                        )}

                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() => push("")}
                        >
                          Add phone number
                        </Button>
                      </Box>
                    )}
                  </FieldArray>
                </>
              )} */}

              <Grid2 size={12}>
                <TextField
                  fullWidth
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_properties.orders_tv_properties_comment"
                  )}
                  placeholder="Comments"
                  multiline
                  rows={8}
                  maxRows={15}
                />
              </Grid2>
            </Grid2>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
