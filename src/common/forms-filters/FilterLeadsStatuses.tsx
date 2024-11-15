import { Box, TextField, Typography } from "@mui/material";
import leadsStatusesStore from "../../store/Leads/statuses-store";

export const FilterLeadsStatuses = ({ formProps }: any) => {
  const { activate_filters, setActiveFilters } = leadsStatusesStore();

  const onChangeInput = (value: string, key: string) => {
    setActiveFilters(value, key);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        Status name
      </Typography>
      <TextField
        size="small"
        id="outlined-basic"
        value={activate_filters.status_name}
        onChange={(e) => onChangeInput(e.target.value, "status_name")}
        placeholder="Status name"
        variant="outlined"
        InputProps={{
          style: { borderRadius: 8 },
        }}
      />
    </Box>
  );
};
