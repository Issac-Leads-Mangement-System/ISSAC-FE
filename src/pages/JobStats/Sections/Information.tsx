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
          מידע על הלקוח
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Grid2 container spacing={1.5}>
            <Grid2 size={6}>
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_id"
                )}
                label="תעודת זהות"
                style={{ display: "flex" }}
              />
            </Grid2>

            <Grid2 size={6}>
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_full_name"
                )}
                label="שם מלא"
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
                label="נייד"
                style={{ display: "flex" }}
              />
            </Grid2>

            <Grid2 size={4}>
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_phone_2"
                )}
                label="נייד נוסף"
                style={{ display: "flex" }}
              />
            </Grid2>

            <Grid2 size={4}>
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_phone_home"
                )}
                label="טלפון נייח"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={4}>
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_city"
                )}
                label="עיר"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={4}>
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_street"
                )}
                label="רחוב"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={2}>
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_home_number"
                )}
                label="בית"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={2}>
              <Input
                {...generateFormikInputFieldProps(
                  formProps,
                  "order_customer_info.customer_apartment_number"
                )}
                label="דירה"
                style={{ display: "flex" }}
              />
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Box>
  );
};
