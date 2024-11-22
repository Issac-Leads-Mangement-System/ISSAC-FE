import { CustomDataGrid } from "../../CustomDataGrid/custom-data-grid";
import { useEffect } from "react";
import leadsHistoryStore from "../../../store/Leads/leadsHistory-store";
import { GridColDef } from "@mui/x-data-grid";

export const LeadsHistory = ({ id }: any) => {
  const { getHistoryLeadById, lead_history, resetLeadById }: any =
    leadsHistoryStore();

  useEffect(() => {
    getHistoryLeadById(id);
    return () => {
      resetLeadById();
    };
  }, [id]);

  const columns: GridColDef<(typeof lead_history)[number]>[] = [
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
    { field: "updated_date", headerName: "Updated date", width: 350 },
  ];

  return (
    <>
      {lead_history?.length > 0 && (
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
