import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  itemName,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: any;
  itemName: string;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {itemName}? This action cannot be
          undone.
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
          Cancel
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
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
