import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { generateFormikInputFieldProps } from "../../../forms/formikHelper";

import Input from "../../Input/Input";

import leadsTypesStore from "../../../store/Leads/types-store";
import leadsStatusesStore from "../../../store/Leads/statuses-store";
import jobsStore from "../../../store/Jobs/jobs-store";
import teamsStore from "../../../store/Teams/teams-store";
import leadsStore from "../../../store/Leads/leads-store";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../CustomDataGrid/custom-data-grid";

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

export const JobsForm = ({ formProps, typeOfAdd, id }: any) => {
  const { types }: any = leadsTypesStore();
  const { job }: any = jobsStore();
  const { leads }: any = leadsStore();
  const { teamsOptions }: any = teamsStore();

  const columns: GridColDef<(typeof leads)[number]>[] = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "lead_message", headerName: "Lead message", width: 250 },
    {
      field: "status_name",
      headerName: "Status name",
      width: 250,
      valueGetter: (_, row: any) => {
        return `${row.lead_status.status_name}`;
      },
    },
    {
      field: "type_name",
      headerName: "Type name",
      width: 250,
      valueGetter: (_, row: any) => {
        return `${row.lead_type.type_name}`;
      },
    },
    { field: "created_date", headerName: "Created date", width: 350 },
  ];

  console.log(formProps);
  return (
    <>
      <Grid2 size={6}>
        <Input
          {...generateFormikInputFieldProps(formProps, "job_name")}
          label="Job name"
          style={{ display: "flex" }}
          size="small"
        />
      </Grid2>
      <Grid2 container spacing={2}>
        {types?.length > 0 && formProps.values.job_name !== "" && (
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
        )}

        {teamsOptions?.length > 0 && formProps.values.job_name !== "" && (
          <Grid2 size={6}>
            <FormControl size="small" sx={{ width: "100%" }}>
              <InputLabel id="team">Team</InputLabel>
              <Select
                labelId="team"
                id="role-select"
                label="Team"
                {...generateFormikInputFieldProps(formProps, "team_id")}
              >
                {teamsOptions?.map((team: any) => (
                  <MenuItem key={crypto.randomUUID()} value={team.id}>
                    {team.team_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
        )}
      {formProps.values.job_name && formProps.values.type_id && formProps.values.team_id && (

          <CustomDataGrid
              rows={leads}
              columns={columns}
              checkboxSelection 
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newRowSelectionModel: any) => {
                console.log('zzzz new', newRowSelectionModel)
                formProps.setFieldValue('leads', newRowSelectionModel)
              }} 
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              // onPaginationModelChange={(model: any) => {
              //   if (model.pageSize !== pagination.pageSize) {
              //     handleChangeRowsPerPage(model);
              //   }
              //   if (model.page !== pagination.page) {
              //     handleChangePage(model);
              //   }
              // }}
              // rowCount={count}
              pageSizeOptions={[5, 10, 25, 50]}
              disableVirtualization
              paginationMode="server"
            />
      )}
      </Grid2>
    </>
  );
};
