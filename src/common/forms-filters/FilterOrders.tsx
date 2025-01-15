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
import { MOBILITY, ORDERS_TYPE, STATUSES } from "../constants";
import ordersListStore from "../../store/Orders/orders-list.store";
import usersStore from "../../store/Users/users-store";

export const FilterOrders = () => {
  const { activate_filters, setActiveFilters }: any = ordersListStore();
  const { users: userTeam }: any = usersStore();

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
        <InputLabel id="order_type">Order type</InputLabel>
        <Select
          labelId="order_type"
          id="order_type"
          multiple
          value={activate_filters.order_type}
          onChange={(e) => handleChange(e, "order_type")}
          input={<OutlinedInput label="Order type" />}
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
          {ORDERS_TYPE.map((type: any) => (
            <MenuItem key={type} value={type}>
              <Checkbox
                checked={activate_filters.order_type.includes(type)}
              />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="mobility">Mobility</InputLabel>
        <Select
          labelId="mobility"
          id="mobility"
          multiple
          value={activate_filters.mobility}
          onChange={(e) => handleChange(e, "mobility")}
          input={<OutlinedInput label="Mobility" />}
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
          {MOBILITY.map((mobility: any) => (
            <MenuItem key={mobility.label} value={mobility.value}>
              <Checkbox
                checked={activate_filters.mobility.includes(mobility.value)}
              />
              <ListItemText primary={mobility.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          id="status"
          multiple
          value={activate_filters.order_status}
          onChange={(e) => handleChange(e, "order_status")}
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
          {STATUSES.map((status: any) => (
            <MenuItem key={status.id} value={status.id}>
              <Checkbox
                checked={activate_filters.order_status.includes(status.id)}
              />
              <ListItemText primary={status.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="status">Users</InputLabel>
        <Select
          labelId="status"
          id="status"
          multiple
          value={activate_filters.user_id}
          onChange={(e) => handleChange(e, "user_id")}
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
          {userTeam.map((user: any) => (
            <MenuItem key={user.id} value={user.id}>
              <Checkbox
                checked={activate_filters.user_id.includes(user.id)}
              />
              <ListItemText primary={`${user.first_name} - ${user.last_name}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
