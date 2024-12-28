import { DataGrid } from "@mui/x-data-grid";
import { styled as styledMaterial } from "@mui/material";

export const CustomDataGrid: any = styledMaterial(DataGrid)(() => ({
  "& .row-green": {
    backgroundColor: "#dff0d8 !important",
  },
  "& .row-red": {
    backgroundColor: "#f2dede !important",
  },
  "& .row-gray" : {
    backgroundColor: "#f2f2f7 !important",
  },
  "& .bold": {
    fontWeight: "bold",
  },
  "& .MuiDataGrid-columnHeaders": {
    position: "relative",
  },
  "& .MuiDataGrid-cell": {
    position: "relative",
  },
  // Actions
  "& .pinned-column": {
    position: "sticky",
    right: 0,
    backgroundColor: "#fff",
    zIndex: 2,
  },
  "& .MuiDataGrid-columnHeader--pinned": {
    position: "sticky!important",
    right: 0,
    backgroundColor: "#fff",
    zIndex: 100,
  },

  "& .MuiDataGrid-row": {
    display: "flex",
  },
  "& .MuiDataGrid-scrollbar--horizontal": {
    display: "grid",
  },
}));
