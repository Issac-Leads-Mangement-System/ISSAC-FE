import React, { useEffect, useState, useRef } from "react";
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
import { Loader } from "../../common/Loader/Loader";

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
    resetPagination,
    isLoading
  }: any = jobsStore();
  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setSecontToolbarMessage("עבודות");
    setSecontToolbarPath("רשימת עבודות");
    getTypes(0, 50);
    getAllJobs();
    getAllTeams();

    return () => {
      resetFilters();
      resetSecondToolbar();
      resetPagination();
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
    setIsConfirmationOpen(true);
    setKey("activeJob", id);
  };

  // const handleDeleteClick = (id: number) => {
  //   console.log("delete", id);
  // };



  const columns: GridColDef<(typeof jobs)[number]>[] = [
    { field: "job_name", headerName: "שם העבודה",      
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",},
    { field: "created_time", headerName: "תאריך יצירה", flex: 1,
      minWidth: 150,
      headerAlign: "center", align: "center",},
    {
      field: "job_status",
      headerName: "סטטוס",
      flex: 1,
      minWidth: 100,
      headerAlign: "center", align: "center",
      cellClassName: (params) => {
        if (params.value === "close") return "row-closed";
        if (params.value === "open") return "row-open";
        if (params.value === "in progress") return "row-in-progress";
        return "";
      },
    },
    {
      field: "lead_type",
      headerName: "סוג ליד",
      flex: 1,
      minWidth: 150,
      headerAlign: "center", align: "center",
      valueGetter: (_, row: any) => {
        return `${row.lead_type.type_name}`;
      },
    },
    {
      field: "total_leads",
      headerName: 'סה"כ לידים',
      flex: 1,
      minWidth: 120,
      headerAlign: "center", align: "center",
    },
    { field: "open_leads", headerName: "לידים פתוחים",       
      flex: 1,
      minWidth: 120,
      headerAlign: "center", align: "center",},
    { field: "success_leads", headerName: "לידים מוצלחים",     
      flex: 1,
      minWidth: 120,
      headerAlign: "center", align: "center",},
    { field: "closed_leads", headerName: "לידים סגורים",     
      flex: 1,
      minWidth: 120,
      headerAlign: "center", align: "center", },
    {
      field: "mobile_deals_success",
      headerName: "עסקאות מובייל",
      flex: 1,
      minWidth: 120,
      headerAlign: "center", align: "center",
    },
    {
      field: "total_leads_user",
      headerName: 'סה"כ לידים למשתמש',
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.total_leads_user}`;
      },
    },
    {
      field: "open_leads_user",
      headerName: "לידים פתוחים למשתמש",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.open_leads_user}`;
      },
    },
    {
      field: "success_leads_user",
      headerName: "לידים מוצלחים למשתמש",
      flex: 1,
      minWidth: 180,
      headerAlign: "center", align: "center",
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.success_leads_user}`;
      },
    },
    {
      field: "closed_leads_user",
      headerName: "לידים סגורים למשתמש",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.closed_leads_user}`;
      },
    },
    {
      field: "mobile_deals_success_user",
      headerName: "עסקאות מובייל למשתמש",
      flex: 1,
      minWidth: 180,
      headerAlign: "center", align: "center",
      valueGetter: (_, row: any) => {
        return `${row.leads_user_info.mobile_deals_success_user}`;
      },
    },

    {
      field: "actions",
      type: "actions",
      width: 150,
      editable: false,
      renderHeader: (params: any) => <strong>{"פעולות "}</strong>,
      filterable: false,
      cellClassName: "pinned-column",
      headerClassName: "MuiDataGrid-columnHeader--pinned",
      getActions: (params: any) => {
        const { id, row } = params;
        if (id) {
          return [
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              title="תצוגה מקדימה"
              label="סגור עבודה"
              key={id}
              sx={{
                color: "#434343",
              }}
              className="textPrimary"
              onClick={() => handleViewClick(id)}
            />,

            <GridActionsCellItem
              icon={<TaskAltIcon />}
              title="סגור עבודה"
              label="Close job"
              key={id}
              disabled={row.job_status === "close"}
              sx={{
                color: "#6ac250",
              }}
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
              <Box sx={{ display: "flex", alignItems: "center" }} dir="ltr">
                <Button
                  variant="outlined"
                  onClick={() => setIsFilterOpen(true)}
                  startIcon={<FilterListIcon />}
                  size="small"
                  sx={filterBtnStyle}
                >
                  מסננים
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => addNewJob()}
                  startIcon={<AddIcon />}
                  size="small"
                  sx={addBtnStyle}
                >
                  הוסף עבודה
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
                style={{
                  maxHeight: "75vh",
                  overflow: "auto",
                }}
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
          message="האם אתה בטוח שברצונך לסגור את העבודה הזו? ודא שאין לך לידים פתוחים לפני כן"
          btnName="שמור"
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

      {isLoading && <Loader />}
    </PageContainer>
  );
};

export default styled(Jobs)`
  ${JobsStyle}
`;
