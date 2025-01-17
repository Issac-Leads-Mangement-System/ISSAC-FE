import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  message,
  btnName,
  btnCancel,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: any;
  message: string;
  btnName: string;
  btnCancel?: string;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Please confirm your changes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            ml: 1,
            border: "1px solid black",
            color: "black",
            fontSize: "12px",
            fontWeight: 700,
            padding: "6px 12px",
            minHeight: "32px",
            minWidth: "130px",
          }}
        >
          {btnCancel || 'Cancel'}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          sx={{
            padding: "4px 12px",
            minHeight: "32px",
            minWidth: "130px",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {btnName}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
