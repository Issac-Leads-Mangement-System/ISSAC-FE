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
import { ErrorMessage, FieldArray } from "formik";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export const PropertiesSection = ({ formProps, createOrderType }: any) => {
  const { orders } = ordersStore();
  const orderInstallationPayments = [1, 12, 36];
  return (
    <div dir="ltr">


    <Box display="flex" flexDirection="column" gap={2} dir="ltr">
      <Box>
        <Paper elevation={3} sx={{ p: 3, m: 2, borderRadius: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            נכסים
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Grid2 container spacing={2}>
              <Grid2 size={12}>
                <FormControl fullWidth>
                  <InputLabel id="package_name">חבילה</InputLabel>
                  <Select
                    labelId="package_name"
                    id="package_name"
                    label="חבילה"
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
                  <ErrorMessage name="order_properties.order_package_id">
                    {(msg) => (
                      <div
                        style={{
                          color: "red",
                          margin: "5px 0px 0px 0px",
                          fontSize: "0.75rem",
                        }}
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
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
                      label="מחיר חודשי"
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
                      label="מחיר בתקנה"
                      style={{ display: "flex" }}
                      regex={/^\d*\.?\d*$/}
                      inputTypeRegex={"decimal"}
                    />
                  </Grid2>

                  <Grid2 size={4}>
                    <FormControl fullWidth>
                      <InputLabel id="payments">תשלומים להתקנה</InputLabel>
                      <Select
                        labelId="payments"
                        id="payments"
                        label="תשלומים להתקנה"
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
                      <ErrorMessage name="order_properties.order_installation_payments">
                        {(msg) => (
                          <div
                            style={{
                              color: "red",
                              margin: "5px 0px 0px 0px",
                              fontSize: "0.75rem",
                            }}
                          >
                            {msg}
                          </div>
                        )}
                      </ErrorMessage>
                    </FormControl>
                  </Grid2>

                  <Grid2 size={4}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        "order_properties.tv_streamers"
                      )}
                      label="סטרימרים"
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
                      label="משתמשים"
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
                      label="מגדילי טווח"
                      style={{ display: "flex" }}
                      regex={/^\d*$/}
                      inputTypeRegex={"numeric"}
                    />
                  </Grid2>
                </>
              )}

              {createOrderType === "mobile" && (
                <FieldArray name="order_properties.order_phone_numbers">
                  {({ push, remove }) => (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        מספרי טלפון
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={() => push("")}
                        >
                          הוסף מספר טלפון
                        </Button>
                      </Box>

                      <Grid2 container spacing={2} wrap="wrap">
                        {formProps.values.order_properties.order_phone_numbers.map(
                          (_: any, index: number, array: any) => {
                            const calculateSize = () => {
                              const total = array.length;

                              if (total === 1) return 12;
                              if (total === 2) return 6;
                              return 4;
                            };

                            return (
                              <Grid2 key={index} size={calculateSize()}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 1,
                                  }}
                                >
                                  <TextField
                                    fullWidth
                                    label={`מספר טלפון ${index + 1}`}
                                    value={
                                      formProps.values.order_properties
                                        .order_phone_numbers[index]
                                    }
                                    onChange={(e) => {
                                      const newPhoneNumbers = [
                                        ...formProps.values.order_properties
                                          .order_phone_numbers,
                                      ];
                                      newPhoneNumbers[index] = e.target.value;
                                      formProps.setFieldValue(
                                        "order_properties.order_phone_numbers",
                                        newPhoneNumbers
                                      );
                                    }}
                                  />
                                  <IconButton
                                    color="error"
                                    onClick={() => remove(index)}
                                    disabled={
                                      formProps.values.order_properties
                                        .order_phone_numbers.length === 1
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Box>
                              </Grid2>
                            );
                          }
                        )}
                      </Grid2>
                    </Box>
                  )}
                </FieldArray>
              )}

              <Grid2 size={12}>
                <TextField
                  fullWidth
                  {...generateFormikInputFieldProps(
                    formProps,
                    "order_properties.orders_tv_properties_comment"
                  )}
                  placeholder="הערות"
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
    </div>
  );
};
