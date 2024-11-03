import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  Divider,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: any;
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    borderRadius: "3px",
    padding: "32px 32px 16px 32px",
    maxWidth: "500px",
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: "4px", right: "4px" }}
          >
            <GridCloseIcon />
          </IconButton>
        </Box>
        <Divider />

        <Box mt={4}>{children}</Box>

        <Box mt={2} display="flex" gap={1} justifyContent="flex-end">
          {/* <Button
            sx={{
              background: "black",
              color: "white",
              fontSize: "12px",
              fontWeight: 700,
              padding: "6px 15px",
              minHeight: "32px",
              minWidth: "130px",
            }}
          >
            Cancel
          </Button> */}
          {/* <Button
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
            Save
          </Button> */}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
