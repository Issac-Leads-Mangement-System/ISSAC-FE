import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styled from "styled-components";

import { SearchInput } from "../../common/Input/SearchInput";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { JobsStyle } from "./JobsStyle";
import leadsStore from "../../store/Leads/leads-store";
import { addBtnStyle } from "../../common/utils";
import { PageContainer } from "../../common/PageContainer/page-container";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import leadsTypesStore from "../../store/Leads/types-store";
import jobsStore from "../../store/Jobs/jobs-store";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowClassNameParams,
} from "@mui/x-data-grid";
import { CustomDataGrid } from "../../common/CustomDataGrid/custom-data-grid";

const Jobs = ({ className }: any) => {
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const { getTypes }: any = leadsTypesStore();
  const { getAllJobs, jobs }: any = jobsStore();
  const navigate = useNavigate();

  useEffect(() => {
    setSecontToolbarMessage("JOBS");
    setSecontToolbarPath("List");
    getTypes(0, 50);
    getAllJobs();

    return () => {
      resetSecondToolbar();
    };
  }, []);

  const handleSearchInputChange = (event: any) => {};

  const addNewJob = () => {
    navigate("/add-job");
  };

  const handleViewClick = (id: number) => {
    console.log("iii id", id);
    navigate(`/job/${id}/stats`);
    // got to the job stats page based on the id
  };

  const columns: GridColDef<(typeof jobs)[number]>[] = [
    { field: "job_name", headerName: "Job name", width: 250 },
    { field: "created_time", headerName: "Created time", width: 150 },
    { field: "job_status", headerName: "Job status", width: 150 },
    {
      field: "lead_type",
      headerName: "Lead type",
      width: 150,
      valueGetter: (_, row: any) => {
        return `${row.lead_type.type_name}`;
      },
    },
    { field: "open_leads", headerName: "Open leads", width: 150 },
    { field: "success_leads", headerName: "Success leads", width: 150 },
    {
      field: "closed_leads_user",
      headerName: "Close leads user",
      width: 150,
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.closed_leads_user}`;
      },
    },
    {
      field: "open_leads_user",
      headerName: "Open leads user",
      width: 150,
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.open_leads_user}`;
      },
    },
    {
      field: "success_leads_user",
      headerName: "Success leads user",
      width: 150,
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.success_leads_user}`;
      },
    },
    {
      field: "total_leads_user",
      headerName: "Total leads user",
      width: 150,
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.total_leads_user}`;
      },
    },
    {
      field: "actions",
      type: "actions",
      width: 150,
      editable: false,
      renderHeader: (params: any) => <strong>{"Actions "}</strong>,
      filterable: false,
      cellClassName: "pinned-column",
      headerClassName: "MuiDataGrid-columnHeader--pinned",
      getActions: (params: any) => {
        const { id } = params;
        if (id) {
          return [
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Previw"
              key={id}
              // sx={{
              //   color: "black",
              // }}
              className="textPrimary"
              onClick={() => handleViewClick(id)}
            />,
          ];
        }
        return [];
      },
    },
  ];
  console.log("zzz jobs", jobs);
  return (
    <PageContainer>
      <div className={`${className}`}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 2,
              }}
            >
              <SearchInput
                onChange={(event: any) => {
                  handleSearchInputChange(event);
                }}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                  }
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* <Button
                variant="outlined"
                onClick={() => setIsFilterOpen(true)}
                startIcon={<FilterListIcon />}
                size="small"
                sx={filterBtnStyle}
              >
                Filters
              </Button> */}

                <Button
                  variant="outlined"
                  onClick={() => addNewJob()}
                  startIcon={<AddIcon />}
                  size="small"
                  sx={addBtnStyle}
                >
                  Add job
                </Button>
              </Box>
            </Box>
            {jobs?.length > 0 && (
              <CustomDataGrid
                rows={jobs}
                columns={columns}
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
                disableRowSelectionOnClick
                disableVirtualization
                paginationMode="server"
                getRowClassName={(params: GridRowClassNameParams) => {
                  console.log("zzz params", params.row.job_status);
                  switch (params.row.job_status) {
                    case "close":
                      return "row-closed";
                    case "open":
                      return "row-open";
                    case "in progress":
                      return "row-in-progress";
                    default:
                      return ""; // Default class if no match
                  }
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default styled(Jobs)`
  ${JobsStyle}
`;
