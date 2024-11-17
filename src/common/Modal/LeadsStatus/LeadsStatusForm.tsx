import {
  Grid2,
} from "@mui/material";

import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import Input from "../../Input/Input";
import { INPUTS, ROLE } from "../../constants";

export const LeadsStatusForm = ({ formProps }: any) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={6}>
        <Input
          {...generateFormikInputFieldProps(formProps, INPUTS.LEADS.STATUS)}
          label="Status name"
          style={{ display: "flex" }}
          size="small"
        />
      </Grid2>
    </Grid2>
  );
};
