import { useEffect, useState } from "react";
import { PageContainer } from "../../common/PageContainer/page-container";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import { SearchInput } from "../../common/Input/SearchInput";
import jobStatsStore from "../../store/Jobs/job-stats-store";
import { useLocation } from "react-router-dom";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { JobStatsCard } from "./JobStatsCards";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { JobStatsModal } from "./JobStatsModal";
import leadsStatusesStore from "../../store/Leads/statuses-store";
import { CustomDataGrid } from "../../common/CustomDataGrid/custom-data-grid";
import { ConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { filterBtnStyle } from "../../common/constants";
import FilterListIcon from "@mui/icons-material/FilterList";
import Filters from "../../components/Filters/filters";
import { FilterJobStats } from "../../common/forms-filters/FilterJobStats";

export const JobStats = () => {
  const location = useLocation();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const {
    getJobById,
    activeJob,
    jobById,
    setKey,
    getJobLeadsById,
    jobLeadsById,
    counter_job_leads,
    setSearchValue,
    pagination,
    setRowsPerPage,
    setPage,
    isLoading,
    deleteJobLead,
    new_status,
    updateJobLead,
    resetFilters,
  }: any = jobStatsStore();

  const { getStatus }: any = leadsStatusesStore();
  const [idLeadJob, setIdLeadJob]: any = useState(undefined);
  const [isFilterOpen, setIsFilterOpen]: any = useState(false);
  const [value, setValue] = useState("1");
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [idLeadJobConfirmation, setIdLeadJobConfirmation]: any =
    useState(undefined);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!activeJob) {
      setKey("activeJob", location.pathname.split("/")[2]);
    }
    return () => {
      resetSecondToolbar();
    };
  }, []);

  useEffect(() => {
    if (activeJob) {
      getJobById();
      getJobLeadsById();
      getStatus(0, 50, true);
    }
  }, [activeJob]);

  useEffect(() => {
    setSecontToolbarMessage(
      `JOB LEADS / ${jobLeadsById[0]?.job.job_name.toUpperCase() || ""}`
    );
    setSecontToolbarPath("Stats");
  }, [jobLeadsById, getJobLeadsById]);

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event.target.value);
    if (!event?.target.value) {
      getJobLeadsById();
    }
  };

  const handleChangeRowsPerPage = async (model: any) => {
    try {
      setRowsPerPage(model.pageSize);
      setPage(model.page);
      await getJobLeadsById();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = async (model: any) => {
    setPage(model.page);
    await getJobLeadsById();
  };

  const handleUpdateJobStatusClick = (id: number, row: any) => {
    setIdLeadJob(id);
    setKey("new_status", row.lead_status.lead_status_id);
    setIsOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    setIdLeadJobConfirmation(id);
    setIsConfirmationOpen(true);
  };

  const createOrder = (id: number) => {};

  const createMobileOrder = (id: number) => {};

  const onCloseFct = () => {
    setIsOpen(false);
  };

  const updateStatus = async () => {
    await updateJobLead(activeJob, idLeadJob, new_status);
    setIsOpen(false);
    await getJobById();
    await getJobLeadsById();
  };

  const getCellClassName = (params: any) => {};

  const getRowClassName = (params: any) => {
    const { lead_status_id } = params.row.lead_status;

    const greenStatuses = [4, 5];

    if (greenStatuses.includes(lead_status_id)) {
      return "row-green";
    }

    const grayStatuses = [1, 4, 5];
    if (!grayStatuses.includes(lead_status_id)) {
      return "row-gray";
    }

    return "";
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationOpen(false);
  };

  const handleSaveConfirmationModal = async () => {
    await deleteJobLead(activeJob, idLeadJobConfirmation);
    await getJobLeadsById();
    setIsConfirmationOpen(false);
  };

  const setIsFilterOpenFct = () => {
    setIsFilterOpen(true);
  };

  const handleFiltersClose = () => {
    setIsFilterOpen(false);
  }

  const resetFilter = async () => {
    resetFilters();
    await getJobLeadsById();
    setIsFilterOpen(false);
  }

  const handleFilter = async () => {
    await getJobLeadsById();
    setIsFilterOpen(false);
  }

  const columns: GridColDef<(typeof jobById)[number]>[] = [
    { field: "created_time", headerName: "Created time", width: 250 },
    { field: "updated_time", headerName: "Updated time", width: 250 },
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {row.user.first_name} - {row.user.last_name}
          </Typography>
        );
      },
    },
    { field: "lead_id", headerName: "Lead", width: 200 },
    {
      field: "mobile_deal_success",
      headerName: "Mobile deal success",
      width: 100,
      renderCell: (params: any) => {
        const { row } = params;
        return row.mobile_deal_success ? (
          <ThumbUpIcon fontSize="small" />
        ) : (
          <ThumbDownIcon fontSize="small" />
        );
      },
    },
    {
      field: "lead_status",
      headerName: "Lead status",
      width: 200,
      renderCell: (params: any) => {
        const { row } = params;
        return <Typography>{row.lead_status.status_name}</Typography>;
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
              icon={<AssignmentIcon />}
              label="Update Lead Job Status"
              title="Update Lead Job Status"
              key={id}
              disabled={jobById.job_status === "close"}
              // sx={{
              //   color: "black",
              // }}
              className="textPrimary"
              onClick={() => handleUpdateJobStatusClick(id, row)}
            />,
            <GridActionsCellItem
              icon={<PostAddIcon />}
              label="Create order"
              title="Create order"
              key={id}
              disabled
              sx={{
                color: "blue",
              }}
              className="textPrimary"
              onClick={() => createOrder(id)}
            />,
            <GridActionsCellItem
              icon={<MobileFriendlyIcon />}
              label="Create mobile order"
              title="Create mobile order"
              key={id}
              disabled
              sx={{
                color: "green",
              }}
              className="textPrimary"
              onClick={() => createMobileOrder(id)}
            />,

            <GridActionsCellItem
              icon={<DeleteForeverIcon />}
              label="Delete"
              title="Delete"
              key={id}
              sx={{
                color: "red",
              }}
              className="textPrimary"
              onClick={() => handleDeleteClick(id)}
              disabled={jobById.job_status === "close"}
            />,
          ];
        }
        return [];
      },
    },
  ];

  return (
    <PageContainer>
      {jobById && jobById.leads_user_info && (
        <Grid2
          container
          spacing={2}
          justifyContent="center"
          sx={{ background: "#f2f2f7", width: "100%" }}
        >
          <JobStatsCard />

          <Grid2 size={12}>
            <Card sx={{ marginTop: "15px" }}>
              <CardContent>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="List" value="1" />
                      <Tab label="Play" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
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
                        onKeyDown={(
                          event: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            getJobLeadsById();
                          }
                        }}
                      />

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                          variant="outlined"
                          onClick={() => setIsFilterOpenFct()}
                          startIcon={<FilterListIcon />}
                          size="small"
                          sx={filterBtnStyle}
                        >
                          Filters
                        </Button>
                      </Box>
                    </Box>

                    <CustomDataGrid
                      rows={jobLeadsById}
                      rowCount={counter_job_leads}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      pageSizeOptions={[5, 10, 25, 50]}
                      onPaginationModelChange={(model: any) => {
                        //   handleChangeRowsPerPage(model);
                        //   handleChangePage(model);
                        if (model.pageSize !== pagination.pageSize) {
                          handleChangeRowsPerPage(model);
                        }
                        if (model.page !== pagination.page) {
                          handleChangePage(model);
                        }
                      }}
                      // rowCount={count}
                      disableRowSelectionOnClick
                      disableVirtualization
                      paginationMode="server"
                      pagination
                      loading={isLoading}
                      getCellClassName={getCellClassName}
                      getRowClassName={getRowClassName}
                    />
                  </TabPanel>
                  <TabPanel value="2">PlayScreen</TabPanel>
                </TabContext>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      )}
      {isOpen && (
        <CustomModal
          isOpen={isOpen}
          onClose={onCloseFct}
          title="Change status lead job"
        >
          <JobStatsModal updateStatus={updateStatus} />
        </CustomModal>
      )}

      {isConfirmationOpen && (
        <ConfirmationModal
          open={isConfirmationOpen}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleSaveConfirmationModal}
          message="Are you sure you want to delete this job?"
          btnName="Save"
        />
      )}

      {isFilterOpen && (
              <Filters
                open={isFilterOpen}
                onClose={handleFiltersClose}
                handleFilter={handleFilter}
                resetFilter={resetFilter}
              >
                <FilterJobStats/>
              </Filters>
            )}
    </PageContainer>
  );
};
