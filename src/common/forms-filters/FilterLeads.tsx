import { Box, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import leadsTypesStore from "../../store/Leads/types-store";
import leadsStore from "../../store/Leads/leads-store";
import leadsStatusesStore from "../../store/Leads/statuses-store";

export const FilterLeads = () => {
  const { activate_filters, setActiveFilters }: any = leadsStore();
  const { types }: any = leadsTypesStore();
  const { statuses }: any = leadsStatusesStore();


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
        <InputLabel id="demo-multiple-checkbox-label">Type</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={activate_filters.lead_type_id}
          onChange={(e) => handleChange(e, 'lead_type_id')}
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
              <Checkbox checked={activate_filters.lead_type_id.includes(type.id)} />
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
          value={activate_filters.lead_status_id}
          onChange={(e) => handleChange(e, 'lead_status_id')}
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
              <Checkbox checked={activate_filters.lead_status_id.includes(status.id)} />
              <ListItemText primary={status.status_name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
