import { CustomDataGrid } from "../../CustomDataGrid/custom-data-grid";
import { useEffect, useState } from "react";
import leadsHistoryStore from "../../../store/Leads/leadsHistory-store";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";

export const LeadsHistory = ({ id }: any) => {
  const { getHistoryLeadById, lead_history, resetLeadById }: any = leadsHistoryStore();

  // State pentru paginare
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  // State pentru rândurile cu ID-uri unice
  const [rowsWithUniqueIds, setRowsWithUniqueIds] = useState<any[]>([]);

  // Actualizarea istoricului lead-urilor
  useEffect(() => {
    getHistoryLeadById(id);
    return () => {
      resetLeadById();
    };
  }, [id, getHistoryLeadById, resetLeadById]);

  // Adăugarea ID-urilor unice pe baza lead_history
  useEffect(() => {
    if (lead_history.length > 0) {
      const dataWithUniqueIds = lead_history.map((row: any, index: number) => ({
        ...row,
        id: `lead-history-${index}`, // Generăm un ID unic per element
      }));
      setRowsWithUniqueIds(dataWithUniqueIds);
    }
  }, [lead_history]);

  // Calcularea rândurilor afișate pe pagina curentă
  const paginatedRows = rowsWithUniqueIds.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  // Definirea coloanelor
  const columns: GridColDef[] = [
    { field: "lead_message", headerName: "הערה", flex: 1,
      minWidth: 400,
      headerAlign: "center", align: "center", },
    {
      field: "status_name",
      headerName: "סטטוס",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",
      valueGetter: (_, row: any) => `${row.lead_status?.status_name || ""}`,
    },
    {
      field: "type_name",
      headerName: "סוג",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",
      valueGetter: (_, row: any) => `${row.lead_type?.type_name || ""}`,
    },
    { field: "created_date", headerName: "תאריך יצירה",flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",},
    { field: "updated_date", headerName: "עודכן לאחרונה", flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",},
  ];


  return (
    <>
      {rowsWithUniqueIds.length > 0 && (
        <div dir="rtl">
        <CustomDataGrid
          rows={paginatedRows} // Rândurile care se vor afișa pe pagina curentă
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: paginationModel.pageSize,
              },
            },
          }}
          rowCount={rowsWithUniqueIds.length} // Totalul rândurilor pentru a gestiona paginarea
          pageSizeOptions={[5, 10, 25, 50]} // Opțiuni pentru selecția numărului de rânduri pe pagină
          paginationModel={paginationModel}
          onPaginationModelChange={(newModel: any) => setPaginationModel(newModel)} // Actualizează paginarea
          disableRowSelectionOnClick
          disableVirtualization
          paginationMode="server"
        />
        </div>
      )}
    </>
  );
};
