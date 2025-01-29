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
import { useEffect, useState } from "react";

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
  const [uploadedFile, setUploadedFile]: any = useState(null);

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
    if (!file) {
      return;
    }

    if (uploadedFile && file.name === uploadedFile.name) {
      alert("הקובץ כבר נוסף!");
      return;
    }

    if (file && file.type === "text/csv") {
      setUploadedFile(file);

      // Update Formik's values using the helper
      formProps.setFieldValue("file", file);
    } else {
      alert("אנה העלה קובץ CSV בלבד!");
    }
  };

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    if (uploadedFile && file.name === uploadedFile.name) {
      alert("קובץ זה כבר נוסף!");
      return;
    }

    setUploadedFile(file);
    formProps.setFieldValue("file", file);

    // Clear the input value to allow re-uploading the same file
    e.target.value = null;
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    formProps.setFieldValue("file", null);
  };

  useEffect(() => {
    setUploadedFile(null);
  }, []);

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
              <div dir="ltr">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ maxWidth: "210px", alignSelf: "center" }}
                disabled={!!uploadedFile}
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
              </div>
            </Box>
          )}
          {uploadedFile && (
            <Box sx={{ marginTop: "16px" }}>
              <Typography variant="h6">Uploaded Files:</Typography>
              <List>
                <ListItem
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
                    {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)}{" "}
                    KB)
                  </Typography>
                  <IconButton onClick={() => handleRemoveFile()}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
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
