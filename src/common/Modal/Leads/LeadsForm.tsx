import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import Input from "../../Input/Input";
import leadsTypesStore from "../../../store/Leads/types-store";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import leadsStatusesStore from "../../../store/Leads/statuses-store";

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

export const LeadsForm = ({ formProps, typeOfAdd, id }: any) => {
  const { types }: any = leadsTypesStore();
  const {
    statuses,
  }: any = leadsStatusesStore();

  return (
    <>
    {types?.length > 0 && statuses?.length > 0 && (
      <Grid2 container spacing={2}>
      <Grid2 size={12}>
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
        <Grid2 size={12}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              accept=".csv"
              type="file"
              {...generateFormikInputFieldProps(formProps, "file")}
              multiple
            />
          </Button>
        </Grid2>
      )}
      {!typeOfAdd && (
        <>
        <Grid2 size={12}>
          <Input
          {...generateFormikInputFieldProps(formProps, 'id')}
          label="Id"
          disabled={id ? true : false}
          style={{ display: "flex" }}
          size="small"
        />
        </Grid2>
        <Grid2 size={12}>
          <Input
          {...generateFormikInputFieldProps(formProps, 'lead_message')}
          label="Lead message"
          style={{ display: "flex" }}
          size="small"
        />
        </Grid2>
        
        <Grid2 size={12}>
        <FormControl size="small" sx={{ width: "100%" }}>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="role-select"
            label="Type"
            {...generateFormikInputFieldProps(formProps, "lead_status_id")}
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
