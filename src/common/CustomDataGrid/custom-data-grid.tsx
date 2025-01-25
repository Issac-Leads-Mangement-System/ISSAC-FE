import { DataGrid } from "@mui/x-data-grid";
import { styled as styledMaterial } from "@mui/material";
import { Color } from "../../theme/Theme";

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
    fontWeight: 600
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
    left: 0,
    backgroundColor: "#fff",
    zIndex: 2,
  },
  "& .MuiDataGrid-columnHeader--pinned": {
    position: "sticky!important",
    left: 0,
    backgroundColor: "#fff",
    zIndex: 100,
    color: "rgb(87, 87, 87)" ,
    fontWeight: 600,
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor:"rgb(242, 242, 247)",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
    color: "rgb(54, 54, 54)"  
  },
  "& .MuiDataGrid-columnHeaderTitleContainerContent": {
    fontWeight: 600,
    color: "rgb(87, 87, 87)"  
  },

  "& .MuiDataGrid-row": {
    display: "flex",
  },
  "& .MuiDataGrid-scrollbar--horizontal": {
    display: "grid",
  },
  "& .MuiToolbar-root": {
    direction: "ltr",
  }

}));
