import { Box, IconButton, Modal, Typography, Divider } from "@mui/material";
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
    bgcolor: "#ffffff",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    border: "1px solid #000",
    boxShadow: 24,
    borderRadius: "3px",
    padding: "32px 32px 16px 32px",
    minWidth: "400px",
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
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            bgcolor: "#fffff",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
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
      </Box>
    </Modal>
  );
};

export default CustomModal;
