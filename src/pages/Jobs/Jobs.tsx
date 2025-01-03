import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../common/CustomDataGrid/custom-data-grid";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import styled from "styled-components";

import { SearchInput } from "../../common/Input/SearchInput";
import { addBtnStyle } from "../../common/utils";
import { PageContainer } from "../../common/PageContainer/page-container";
import { ConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { filterBtnStyle } from "../../common/constants";
import Filters from "../../components/Filters/filters";
import { FilterJobs } from "../../common/forms-filters/FilterJobs";

import { JobsStyle } from "./JobsStyle";

import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import leadsTypesStore from "../../store/Leads/types-store";
import jobsStore from "../../store/Jobs/jobs-store";
import jobStatsStore from "../../store/Jobs/job-stats-store";
import teamsStore from "../../store/Teams/teams-store";

const Jobs = ({ className }: any) => {
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const { getTypes }: any = leadsTypesStore();
  const { getAllTeams }: any = teamsStore();
  const { setKey, activeJob }: any = jobStatsStore();
  const {
    getAllJobs,
    jobs,
    counter_jobs,
    pagination,
    setRowsPerPage,
    setPage,
    setSearchedValue,
    updateJobStatus,
    resetFilters,
  }: any = jobsStore();
  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setSecontToolbarMessage("JOBS");
    setSecontToolbarPath("List");
    getTypes(0, 50);
    getAllJobs();
    getAllTeams();

    return () => {
      resetSecondToolbar();
    };
  }, []);

  const handleSearchInputChange = (event: any) => {
    setSearchedValue(event.target.value);
    if (!event?.target.value) {
      getAllJobs();
    }
  };

  const addNewJob = () => {
    navigate("/add-job");
  };

  const handleViewClick = (id: number) => {
    setKey("activeJob", id);
    navigate(`/job/${id}/stats`);
    // got to the job stats page based on the id
  };

  const handleChangeRowsPerPage = async (model: any) => {
    try {
      setRowsPerPage(model.pageSize);
      setPage(model.page);
      await getAllJobs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = async (model: any) => {
    setPage(model.page);
    await getAllJobs();
  };

  // const handleChangeStatusJob = (id: any) => {
  //   setIsConfirmationOpen(true);
  //   setKey("activeJob", id);
  // };

  const handleCloseModal = () => {
    setIsConfirmationOpen(false);
  };

  const handleConfirmDelete = async () => {
    await updateJobStatus(activeJob);
    setIsConfirmationOpen(false);
    setKey("activeJob", "");
    await getAllJobs();
  };

  const handleFilter = () => {
    getAllJobs();
    setIsFilterOpen(false);
  };
  const handleResetFilter = () => {
    resetFilters();
    getAllJobs();
  };

  const handleUpdateJobStatusClick = (id: number) => {
    // console.log("click here", id);
    setIsConfirmationOpen(true);
    setKey("activeJob", id);
  };

  // const handleDeleteClick = (id: number) => {
  //   console.log("delete", id);
  // };

  const columns: GridColDef<(typeof jobs)[number]>[] = [
    { field: "job_name", headerName: "Job name", width: 250 },
    { field: "created_time", headerName: "Created time", width: 150 },
    {
      field: "job_status",
      headerName: "Job status",
      width: 150,
      cellClassName: (params) => {
        if (params.value === "close") return "row-closed";
        if (params.value === "open") return "row-open";
        if (params.value === "in progress") return "row-in-progress";
        return "";
      },
    },
    {
      field: "lead_type",
      headerName: "Lead type",
      width: 150,
      valueGetter: (_, row: any) => {
        return `${row.lead_type.type_name}`;
      },
    },
    {
      field: "total_leads",
      headerName: "Total leads",
      width: 150,
    },
    { field: "open_leads", headerName: "Open leads", width: 150 },
    { field: "success_leads", headerName: "Success leads", width: 150 },
    { field: "closed_leads", headerName: "Closed leads", width: 150 },
    {
      field: "mobile_deals_success",
      headerName: "Mobile deals success",
      width: 150,
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
      field: "closed_leads_user",
      headerName: "Close leads user",
      width: 150,
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.closed_leads_user}`;
      },
    },
    {
      field: "mobile_deals_success_user",
      headerName: "Mobile deals success user",
      width: 150,
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.mobile_deals_success_user}`;
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
        const { id, row } = params;
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

            <GridActionsCellItem
              icon={<TaskAltIcon />}
              label="Close job"
              title="Close job"
              key={id}
              disabled={row.job_status === "close"}
              // sx={{
              //   color: "black",
              // }}
              className="textPrimary"
              onClick={() => handleUpdateJobStatusClick(id)}
            />,
            // confirm this with Marcel

            // <GridActionsCellItem
            //   icon={<TaskAltIcon />}
            //   label="Close"
            //   key={id}
            //   disabled={row.job_status === "close"}
            //   // sx={{
            //   //   color: "black",
            //   // }}
            //   className="textPrimary"
            //   onClick={() => handleChangeStatusJob(id)}
            // />,

            // <GridActionsCellItem
            //   icon={<DeleteForeverIcon />}
            //   label="Delete"
            //   title="Delete"
            //   key={id}
            //   sx={{
            //     color: "red",
            //   }}
            //   className="textPrimary"
            //   onClick={() => handleDeleteClick(id)}
            // />,
          ];
        }
        return [];
      },
    },
  ];
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
                    getAllJobs();
                  }
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  onClick={() => setIsFilterOpen(true)}
                  startIcon={<FilterListIcon />}
                  size="small"
                  sx={filterBtnStyle}
                >
                  Filters
                </Button>

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
                onPaginationModelChange={(model: any) => {
                  if (model.pageSize !== pagination.pageSize) {
                    handleChangeRowsPerPage(model);
                  }
                  if (model.page !== pagination.page) {
                    handleChangePage(model);
                  }
                }}
                rowCount={counter_jobs}
                pageSizeOptions={[5, 10, 25, 50]}
                disableRowSelectionOnClick
                disableVirtualization
                paginationMode="server"
              />
            )}
          </CardContent>
        </Card>
      </div>

      {isConfirmationOpen && (
        <ConfirmationModal
          open={isConfirmationOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to close this job? Make sure you don't have open leads before"
          btnName="Save"
        />
      )}

      {isFilterOpen && (
        <Filters
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          handleFilter={handleFilter}
          resetFilter={handleResetFilter}
        >
          <FilterJobs />
        </Filters>
      )}
    </PageContainer>
  );
};

export default styled(Jobs)`
  ${JobsStyle}
`;
