import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import Input from "../../Input/Input";
import { DUMMY_TEAMS, INPUTS, ROLE } from "../../constants";

export const UserForm = ({ formProps, userTeamList }: any) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "300px",
      }}
    >
      <Input
        {...generateFormikInputFieldProps(formProps, INPUTS.FIRST_NAME.NAME)}
        label="First name"
        style={{ display: "flex" }}
        size="small"
      />
      <Input
        {...generateFormikInputFieldProps(formProps, INPUTS.LAST_NAME.NAME)}
        label="Last name"
        style={{ display: "flex" }}
        size="small"
      />
      <Input
        {...generateFormikInputFieldProps(formProps, INPUTS.EMAIL.NAME)}
        label="Email"
        style={{ display: "flex" }}
        size="small"
      />
      <Input
        {...generateFormikInputFieldProps(formProps, INPUTS.PASSWORD_UER.NAME)}
        label="Password"
        style={{ display: "flex" }}
        size="small"
        // inputType="password"
      />
      <Input
        {...generateFormikInputFieldProps(formProps, INPUTS.PHONE.NAME)}
        label="Phone number"
        style={{ display: "flex" }}
        size="small"
      />
      <FormControl size="small">
        <InputLabel id="role">Team</InputLabel>
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
      </FormControl>

      <FormControl size="small">
        <InputLabel id="role">Role</InputLabel>
        <Select
          labelId="role"
          id="role-select"
          label="Role"
          {...generateFormikInputFieldProps(formProps, INPUTS.ROLE.NAME)}
        >
          {ROLE?.map((role: any) => (
            <MenuItem key={crypto.randomUUID()} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
