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
import { CustomDataGrid } from "../../CustomDataGrid/custom-data-grid";
import { useEffect } from "react";
import leadsHistoryStore from "../../../store/Leads/leadsHistory-store";
import { GridColDef } from "@mui/x-data-grid";

export const LeadsHistory = ({ id }: any) => {
  const { types }: any = leadsTypesStore();
  const { statuses }: any = leadsStatusesStore();
  const { getHistoryLeadById, lead_history, resetLeadById }: any =
    leadsHistoryStore();

  useEffect(() => {
    getHistoryLeadById(id);

    return () => {
      resetLeadById();
    };
  }, [id]);

  const columns: GridColDef<(typeof lead_history)[number]>[] = [
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

  return (
    <>
      {lead_history && (
        <CustomDataGrid
          rows={lead_history}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          rowCount={lead_history.length}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          disableVirtualization
          paginationMode="server"
        />
      )}
    </>
  );
};
