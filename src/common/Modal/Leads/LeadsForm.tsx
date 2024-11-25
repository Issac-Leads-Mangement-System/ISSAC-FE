import {
  Box,
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { generateFormikInputFieldProps } from "../../../forms/formikHelper";

import Input from "../../Input/Input";

import leadsTypesStore from "../../../store/Leads/types-store";
import leadsStatusesStore from "../../../store/Leads/statuses-store";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const dropZoneStyle = {
  border: "2px dashed #ccc",
  borderRadius: "8px",
  padding: "16px",
  textAlign: "center",
  color: "#666",
  cursor: "pointer",
  backgroundColor: "#fafafa",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "28px",
};
const dropZoneActiveStyle = {
  ...dropZoneStyle,
  backgroundColor: "lightgrey",
  border: "none",
};

export const LeadsForm = ({ formProps, typeOfAdd, id }: any) => {
  const { types }: any = leadsTypesStore();
  const { statuses }: any = leadsStatusesStore();

  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles]: any = useState([]);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    const isDuplicate = selectedFiles.some(
      (f: any) => f.name === file.name && f.size === file.size
    );

    if (isDuplicate) {
      alert("This file has already been added!");
      return;
    }

    if (file && file.type === "text/csv") {
      // setSelectedFiles((prevFiles: any) => [...prevFiles, file]);
      const updatedFiles = [...selectedFiles, file];
      setSelectedFiles(updatedFiles);

      // Update Formik's values using the helper
      formProps.setFieldValue("file", updatedFiles);
    } else {
      alert("Please upload a valid CSV file!");
    }
  };

  const handleFileInputChange = (e: any) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const newFiles = files.filter(
      (file: any) =>
        !selectedFiles.some(
          (f: any) => f.name === file.name && f.size === file.size
        )
    ); // Avoid duplicates

    if (newFiles.length > 0) {
      setSelectedFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
    } else {
      alert("These files have already been added!");
    }

    // Clear the input value to allow re-uploading the same file
    e.target.value = null;
  };

  const handleRemoveFile = (fileName: any) => {
    setSelectedFiles((prevFiles: any) =>
      prevFiles.filter((file: any) => file.name !== fileName)
    );
  };

  return (
    <>
      {types?.length > 0 && statuses?.length > 0 && (
        <Grid2 container spacing={2} sx={{ minWidth: "612px" }}>
          <Grid2 size={6}>
            <FormControl size="small" sx={{ width: "100%" }}>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type"
                id="role-select"
                label="Type"
                {...generateFormikInputFieldProps(formProps, "type_id")}
              >
                {types?.map((team: any) => (
                  <MenuItem key={crypto.randomUUID()} value={team.id}>
                    {team.type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          {typeOfAdd && (
            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={dragOver ? dropZoneActiveStyle : dropZoneStyle}
            >
              <Typography>Drag a file here or</Typography>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ maxWidth: "210px", alignSelf: "center" }}
              >
                Upload files
                <VisuallyHiddenInput
                  accept=".csv"
                  type="file"
                  {...generateFormikInputFieldProps(formProps, "file")}
                  multiple
                  onChange={handleFileInputChange}
                />
              </Button>
            </Box>
          )}
          {selectedFiles.length > 0 && (
            <Box sx={{ marginTop: "16px" }}>
              <Typography variant="h6">Uploaded Files:</Typography>
              <List>
                {selectedFiles.map((file: any, index: number) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "8px 16px",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography>
                      {file.name} ({Math.round(file.size / 1024)} KB)
                    </Typography>
                    <IconButton onClick={() => handleRemoveFile(file.name)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          {!typeOfAdd && (
            <>
              <Grid2 size={6}>
                <Input
                  {...generateFormikInputFieldProps(formProps, "id")}
                  label="Id"
                  disabled={!!id}
                  style={{ display: "flex" }}
                  size="small"
                />
              </Grid2>
              <Grid2 size={6}>
                <Input
                  {...generateFormikInputFieldProps(formProps, "lead_message")}
                  label="Lead message"
                  style={{ display: "flex" }}
                  size="small"
                />
              </Grid2>

              <Grid2 size={6}>
                <FormControl size="small" sx={{ width: "100%" }}>
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="role-select"
                    label="Type"
                    {...generateFormikInputFieldProps(
                      formProps,
                      "lead_status_id"
                    )}
                  >
                    {statuses?.map((team: any) => (
                      <MenuItem key={crypto.randomUUID()} value={team.id}>
                        {team.status_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>
            </>
          )}
        </Grid2>
      )}
    </>
  );
};
