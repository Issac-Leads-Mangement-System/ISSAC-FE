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
import jobStatsStore from "../../store/Jobs/job-stats-store";
import leadsStatusesStore from "../../store/Leads/statuses-store";

export const FilterJobStats = () => {
  const { activate_filters }: any = jobsStore();
  const { filters, setActiveFilters }: any = jobStatsStore();
  const { statuses }: any = leadsStatusesStore();
  const { types }: any = leadsTypesStore();
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
    setActiveFilters(
      typeof value === "string" ? value.split(",").map(Number) : value,
      key
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Lead status</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={filters.lead_status_id}
          onChange={(e) => handleChange(e, "lead_status_id")}
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
                checked={filters.lead_status_id.includes(status.id)}
              />
              <ListItemText primary={status.status_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Mobile deal</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={filters.mobile_deal_success}
          onChange={(e) => handleChange(e, "mobile_deal_success")}
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
          {[{name: 'Yes', value: true}, {name: 'No', value: false}].map((team: any) => (
            <MenuItem key={team.name} value={team.value}>
              <Checkbox checked={filters.mobile_deal_success.includes(team.value)} />
              <ListItemText primary={team.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* please display this conditionally based on the user role */}
    </Box>
  );
};
