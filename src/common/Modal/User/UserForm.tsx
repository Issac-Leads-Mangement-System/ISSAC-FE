import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import Input from "../../Input/Input";
import { INPUTS, ROLE, ROLE_MANAGER } from "../../constants";
import { ErrorMessage } from "formik";
import { useEffect } from "react";
import usersStore from "../../../store/Users/users-store";

export const UserForm = ({ formProps, userTeamList }: any) => {
  const { user }: any = usersStore();
 
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={6}>
        <Input
          {...generateFormikInputFieldProps(formProps, INPUTS.FIRST_NAME.NAME)}
          label="שם פרטי"
          style={{ display: "flex" }}
          size="small"
        />
      </Grid2>
      <Grid2 size={6}>
        <Input
          {...generateFormikInputFieldProps(formProps, INPUTS.LAST_NAME.NAME)}
          label="שם משפחה"
          style={{ display: "flex" }}
          size="small"
        />
      </Grid2>
      <Grid2 size={6}>
        <Input
          {...generateFormikInputFieldProps(formProps, INPUTS.EMAIL.NAME)}
          label="אימייל"
          style={{ display: "flex" }}
          size="small"
        />
      </Grid2>
      <Grid2 size={6}>
        <Input
          {...generateFormikInputFieldProps(
            formProps,
            INPUTS.PASSWORD_UER.NAME
          )}
          label="סיסמא"
          style={{ display: "flex" }}
          size="small"
        />
      </Grid2>
      <Grid2 size={6}>
        <Input
          {...generateFormikInputFieldProps(formProps, INPUTS.PHONE.NAME)}
          label="טלפון"
          style={{ display: "flex" }}
          size="small"
        />
      </Grid2>
      <Grid2 size={3}>
        <FormControl size="small" sx={{ width: "100%" }}>
          <InputLabel id="role">צוות</InputLabel>
          <Select
            labelId="role"
            id="role-select"
            label="Role"
            {...generateFormikInputFieldProps(formProps, INPUTS.TEAM_ID.NAME)}
          >
            {userTeamList?.map((team: any) => (
              <MenuItem key={crypto.randomUUID()} value={team.id}>
                {team.team_name}
              </MenuItem>
            ))}
          </Select>
          <ErrorMessage name="team_id">
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
      <Grid2 size={3}>
        <FormControl size="small" sx={{ width: "100%" }}>
          <InputLabel id="role">הרשאות</InputLabel>
          <Select
            labelId="role"
            id="role-select"
            label="Role"
            {...generateFormikInputFieldProps(formProps, INPUTS.ROLE.NAME)}
          >
            {user.user_role === 'manager' ? ROLE_MANAGER : ROLE?.map((role: any) => (
              <MenuItem key={crypto.randomUUID()} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
          <ErrorMessage name="user_role">
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
    </Grid2>
  );
};
