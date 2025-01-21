import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

import leadsTypesStore from "../../store/Leads/types-store";
import jobsStore from "../../store/Jobs/jobs-store";
import teamsStore from "../../store/Teams/teams-store";
import usersStore from "../../store/Users/users-store";

export const FilterJobs = () => {
  const { activate_filters, setActiveFilters }: any = jobsStore();
  const { types }: any = leadsTypesStore();
  const { teamsOptions }: any = teamsStore();
  const { user }: any = usersStore();
  const statuses = [
    { id: "close", name: "close" },
    { id: "in progress", name: "in progress" },
    { id: "open", name: "open" },
  ];

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
    setActiveFilters(
      typeof value === "string" ? value.split(",").map(Number) : value,
      key
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Type</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={activate_filters.type_id}
          onChange={(e) => handleChange(e, "type_id")}
          input={<OutlinedInput label="Type" />}
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
          {types.map((type: any) => (
            <MenuItem key={type.id} value={type.id}>
              <Checkbox checked={activate_filters.type_id.includes(type.id)} />
              <ListItemText primary={type.type_name} />
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
          value={activate_filters.job_status}
          onChange={(e) => handleChange(e, "job_status")}
          input={<OutlinedInput label="Type" />}
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
          {statuses.map((status: any) => (
            <MenuItem key={status.id} value={status.id}>
              <Checkbox
                checked={activate_filters.job_status.includes(status.id)}
              />
              <ListItemText primary={status.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {user.user_role === "admin" && (
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Team</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={activate_filters.team_id}
            onChange={(e) => handleChange(e, "team_id")}
            input={<OutlinedInput label="Type" />}
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
                <Checkbox
                  checked={activate_filters.team_id.includes(team.id)}
                />
                <ListItemText primary={team.team_name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {/* please display this conditionally based on the user role */}
    </Box>
  );
};
