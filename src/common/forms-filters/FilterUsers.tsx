import { Box, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import { ROLE, USER_STATUS } from "../constants";
import usersStore from "../../store/Users/users-store";
import teamsStore from "../../store/Teams/teams-store";

export const FilterUsers = () => {
  const { activate_filters, setActiveFilters }: any = usersStore();
  const { teamsOptions }: any = teamsStore();


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent<number[]>, key: string) => {
    const {
      target: { value },
    } = event;
    setActiveFilters(typeof value === "string" ? value.split(",").map(Number) : value, key);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Role</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={activate_filters.user_role}
          onChange={(e) => handleChange(e, 'user_role')}
          input={<OutlinedInput label="Role" />}
          renderValue={(selected: any) => {
            const count = selected.length;
            return count === 0
              ? "No elements selected"
              : count === 1
              ? `${count} element selected`
              : `${count} elements selected`;
          }}
          MenuProps={MenuProps}
        >
          {ROLE.map((role: any) => (
            <MenuItem key={role} value={role}>
              <Checkbox checked={activate_filters?.user_role.includes(role)} />
              <ListItemText primary={role} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Status</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={activate_filters.user_status}
          onChange={(e) => handleChange(e, 'user_status')}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected: any) => {
            const count = selected.length;
            return count === 0
              ? "No elements selected"
              : count === 1
              ? `${count} element selected`
              : `${count} elements selected`;
          }}
          MenuProps={MenuProps}
        >
          {USER_STATUS.map((status: any) => (
            <MenuItem key={status} value={status}>
              <Checkbox checked={activate_filters?.user_status.includes(status)} />
              <ListItemText primary={status} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Teams</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={activate_filters.team_id}
          onChange={(e) => handleChange(e, 'team_id')}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected: any) => {
            const count = selected.length;
            return count === 0
              ? "No elements selected"
              : count === 1
              ? `${count} element selected`
              : `${count} elements selected`;
          }}
          MenuProps={MenuProps}
        >
          {teamsOptions.map((team: any) => (
            <MenuItem key={team.id} value={team.id}>
              <Checkbox checked={activate_filters?.team_id.includes(team.id)} />
              <ListItemText primary={team.team_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Box>
  );
};
