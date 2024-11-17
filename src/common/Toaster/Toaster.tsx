import { Snackbar, Alert, AlertProps } from "@mui/material";

import useNotificationStore from "../../store/Notification/notification-store";
import { getSeverityLevel } from "../utils";

export const Toaster = () => {
  const { notification, handleClose } = useNotificationStore();
  const { open, message, severity } = notification;
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={getSeverityLevel(severity)}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
