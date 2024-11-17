import { create } from "zustand";

export type Severity = "success" | "info" | "warning" | "error";

export interface NotificationState {
  notification: Notification;
  showNotification: ({ message, severity, status }: Notification) => void;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

export interface Notification {
  open?: boolean;
  message: string;
  severity: number;
  status: string;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notification: { open: false, message: "", severity: NaN, status: "" },

  showNotification: ({ message, severity, status }) =>
    set(() => ({
      notification: {
        open: true,
        message: typeof message === "string" ? message : "unknown",
        severity,
        status,
      },
    })),

  handleClose: (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    set((state) => ({ notification: { ...state.notification, open: false } }));
  },
}));

export default useNotificationStore;
