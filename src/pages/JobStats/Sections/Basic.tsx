import React from "react";
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

export const BasicInfoSection = React.memo(({ formProps }: any) => {
  return (
    <Box>
      <Paper elevation={4} sx={{ p: 3, m: 2, borderRadius: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          מידע על חברה קודמת
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Grid2 container spacing={5}>
            <Grid2 size={9}>
              <Input
                {...generateFormikInputFieldProps(formProps, "order_basic_info.former_company")}
                label="חברה קודמת"
                style={{ display: "flex" }}
              />
            </Grid2>
            <Grid2 size={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...generateFormikInputFieldProps(formProps, "order_basic_info.mobility")}
                  />
                }
                label="ניוד"
              />
            </Grid2>
          </Grid2>
        </Box>
      </Paper>
    </Box>
  );
});
