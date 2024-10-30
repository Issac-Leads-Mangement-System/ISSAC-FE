import { Grid2 } from "@mui/material";

import Input from "../../Input/Input";
import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import { INPUTS } from "../../constants";

export const TeamForm = ({ formProps }: any) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2>
        <Input
          {...generateFormikInputFieldProps(formProps, INPUTS.TEAM.NAME)}
          label="Team name"
          style={{ display: "flex" }}
          size="small"
        />
      </Grid2>
    </Grid2>
  );
};
