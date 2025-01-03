import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect } from "react";
import { ORDERS_TYPE } from "../../../common/constants";
import ordersStore from "../../../store/Orders/orders-store";

export const PackageTypeModal = ({savePackage}: any) => {
  const { order, setKey }: any = ordersStore();
  

  const changeType = (e: any, type: any) => {
    setKey(type, e.target.value);
  }

  return (
    <>
    <Box>
      <InputLabel
        id="type"
        sx={{
          fontWeight: "bold",
          color: "#333",
          marginBottom: "5px",
        }}
      >
        Order type
      </InputLabel>
      <Select
        labelId="type"
        id="role-select"
        value={order.order_type || ""}
        onChange={(e) => changeType(e, 'order_type')}
        sx={{
          width: "100%",
          height: "56px",
          fontSize: "1rem",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        {ORDERS_TYPE?.map((order: any) => (
          <MenuItem key={order} value={order}>
            {order}
          </MenuItem>
        ))}
      </Select>

      <InputLabel
        id="type"
        sx={{
          fontWeight: "bold",
          color: "#333",
          marginBottom: "8px",
        }}
      >
        Packange name
      </InputLabel>
      <TextField
        value={order.package_name}
        onChange={(e) => changeType(e, "package_name")}
        size="medium"
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      />
    </Box>

      <Button
        onClick={savePackage}
        color="primary"
        variant="contained"
        sx={{
          padding: "4px 12px",
          marginTop: "10px",
          minHeight: "32px",
          minWidth: "130px",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        Save
      </Button>
    </>
  );
};
