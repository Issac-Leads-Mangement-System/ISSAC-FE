import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Filters({ open, onClose, handleFilter, children, resetFilter }: any) {
  return (
    <React.Fragment key={"right"}>
      <Drawer anchor={"right"} open={open} onClose={onClose}>
      <Box sx={{ width: 360, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
         {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
            bgcolor: '#f1f4f8', 
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            Filters
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Content Divider */}
        <Divider />
         

        {children}
        
        {/* Bottom Buttons */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 2,
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: 'background.paper',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <Button
            variant="outlined"
            onClick={resetFilter}
            sx={{
              color: '#6c757d',
              borderColor: '#dee2e6',
              borderRadius: 8,
              width: '45%',
              textTransform: 'none',
            }}
          >
            Clear Filter
          </Button>
          <Button
            variant="contained"
            onClick={handleFilter}
            sx={{
              bgcolor: '#17a2b8', 
              color: '#fff',
              borderRadius: 8,
              width: '45%',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#138496',
              },
            }}
          >
            Filters
          </Button>
        </Box>
        </Box>

      </Drawer>
    </React.Fragment>
  );
}
