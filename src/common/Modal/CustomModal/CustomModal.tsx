import { Box, IconButton, Modal, Typography, Divider } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  minWidth,
  width,
  dir = "ltr",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: any;
  minWidth?: string;
  width?: string;
  dir?: string
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    bgcolor: "#ffffff",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #000",
    boxShadow: 24,
    borderRadius: "3px",
    padding: "32px 32px 16px 32px",
    width: width || "90%",
    minWidth: minWidth || "400px"
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style} dir={dir}>
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

        <Box sx={{marginTop: "20px"}}>{children}</Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
