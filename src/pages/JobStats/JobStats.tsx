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
import ScreenNavigation from "./JobScreenNavigation";
import ScreenNavigationWithGrid from "./JobScreenNavigation";
import { filterBtnStyle, submitBtnStyle } from "../../common/constants";
import FilterListIcon from "@mui/icons-material/FilterList";
import Filters from "../../components/Filters/filters";
import { FilterJobStats } from "../../common/forms-filters/FilterJobStats";
import ListAltIcon from "@mui/icons-material/ListAlt";
import usersStore from "../../store/Users/users-store";
import { JobStatsCreateOrderModal } from "./JobStatsCreateOrderModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import {
  ICreateOrderModalSchema,
  initialValues,
} from "../../forms/createOrderSchema";
import ordersStore from "../../store/Orders/orders-store";
import { customValidation } from "../../common/utils";
import { JobsStatsStyle } from "./JobStatsStyle";
import styled from "styled-components";
import jobsStore from "../../store/Jobs/jobs-store";

const JobStats = ({className}: any) => {
  const [initialFormValues, setInitialFormValues] =
    useState<ICreateOrderModalSchema>({
      ...initialValues,
    });
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
    submitCreateOrder,
  }: // resetJobLeadsById,
  any = jobStatsStore();
    
  const { getUserTeam }: any = jobsStore();

  const { getOrders }: any = ordersStore();

  const { getStatus }: any = leadsStatusesStore();
  const { user }: any = usersStore();

  const [idLead, setIdLead]: any = useState(undefined);
  const [isFilterOpen, setIsFilterOpen]: any = useState(false);
  const [tab, setTab] = useState("1");
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [leadJobId, setLeadJobId]: any = useState(null);
  const [createOrderType, setCreateOrderType]: any = useState("TV");

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    if (newValue === "2") {
      setLeadJobId(null);
      await getJobLeadsById(true);
      setInitialFormValues((prevValues) => ({
        ...prevValues,
        order_basic_info: {
          ...(prevValues.order_basic_info || {}),
          order_type: "mobile",
        },
      }));
      // setIdLeadJobConfirmation(jobLeadsById[0].lead_id);
    } else {
      setInitialFormValues((prevValues) => ({
        ...prevValues,
        order_basic_info: {
          ...(prevValues.order_basic_info || {}),
          order_type: "TV",
        },
      }));
      await getJobById();
      await getJobLeadsById();
      await getStatus(0, 50, true);
    }
    setTab(newValue);
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
      getUserTeam(false);
    }
  }, [activeJob]);

  useEffect(() => {
    setSecontToolbarMessage(
      `לידים בעבודה / ${jobLeadsById[0]?.job.job_name.toUpperCase() || ""}`
    );
    setSecontToolbarPath("נתוני עבודה");
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
    setIdLead(id);
    setKey("new_status", row.lead_status.lead_status_id);
    setIsOpen(true);
    // await getJobLeadsById(true);
  };

  const handleDeleteClick = async (id: number) => {
    setLeadJobId(id);
    setIsConfirmationOpen(true);
  };

  const createOrder = (id: number, lead_id: string, order_type: string) => {
    setIdLead(lead_id);
    setLeadJobId(id);
    setCreateOrderType(order_type);
    setIsCreateOrderOpen(true);
    setInitialFormValues((prevValues) => ({
      ...prevValues,
      order_basic_info: {
        ...(prevValues.order_basic_info || {}),
        order_type: order_type,
        lead_id: lead_id,
        lead_job_id: id,
      },
    }));
  };

  const createMobileOrder = (id: number) => {};

  const onCloseFct = () => {
    setIsOpen(false);
  };

  const onCloseCreateOrder = () => {
    setIsCreateOrderOpen(false);
  };

  const updateStatus = async () => {
    await updateJobLead(activeJob, idLead, new_status);
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
      return "row-red";
    }

    return "";
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationOpen(false);
  };

  const handleSaveConfirmationModal = async () => {
    await deleteJobLead(activeJob, leadJobId);
    await getJobLeadsById();
    setIsConfirmationOpen(false);
  };

  const setIsFilterOpenFct = () => {
    setIsFilterOpen(true);
  };

  const handleFiltersClose = () => {
    setIsFilterOpen(false);
  };

  const resetFilter = async () => {
    resetFilters();
    await getJobLeadsById();
    setIsFilterOpen(false);
  };

  const handleFilter = async () => {
    await getJobLeadsById();
    setIsFilterOpen(false);
  };


  const columns: GridColDef<(typeof jobById)[number]>[] = [
    {
      field: "lead_id",
      headerName: "ליד ",
      minWidth: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "user",
      headerName: "משתמש ",
      flex: 1,
      minWidth: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return `${row.user.first_name} - ${row.user.last_name}`;
      },
    },
    {
      field: "lead_status",
      headerName: "סטטוס ליד",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return row.lead_status.status_name;
      },
    },
    {
      field: "mobile_deal_success",
      headerName: "עסקת מובייל",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
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
      field: "created_time",
      headerName: "נוצר ",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "updated_time",
      headerName: "עודכן ",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      flex: 1,
    },

    {
      field: "actions",
      type: "actions",
      minWidth: 250,
      flex: 1,
      headerAlign: "center", align: "center",
      editable: false,
      headerName: "פעולות",
      filterable: false,
      cellClassName: "pinned-column",
      headerClassName: "MuiDataGrid-columnHeader--pinned",
      getActions: (params: any) => {
        const { id, row } = params;

        if (id) {
          return [
            <GridActionsCellItem
              icon={<PlayCircleOutlineIcon />}
              label="מסך הפעלה"
              title="Play screen"
              key={id}
              sx={{
                color: "#1976d2",
              }}
              className="textPrimary"
              onClick={() => playScreen(row.lead_id, id)}
              disabled={!row.isCurrentUser}
            />,

            <GridActionsCellItem
              icon={<AssignmentIcon />}
              title="עדכון סטטוס עבודה ליד"
              label="Update Lead Job Status"
              key={id}
              disabled={
                jobById.job_status === "close" ||
                [4, 5].includes(row.lead_status.lead_status_id)
              }
              sx={{
                color: "#434343",
              }}
              className="textPrimary"
              onClick={() => handleUpdateJobStatusClick(id, row)}
            />,
            <GridActionsCellItem
              icon={<PostAddIcon />}
              title="צור הזמנה טלוויזיה"
              label="Create order"
              key={id}
              disabled={[4, 5].includes(row.lead_status.lead_status_id)}
              sx={{
                color: "#6ac250",
              }}
              className="textPrimary"
              onClick={() => createOrder(id, row.lead_id, "TV")}
            />,
            <GridActionsCellItem
              icon={<MobileFriendlyIcon />}
              title="צור הזמנה מובייל"
              label="Create mobile order"
              disabled={row.mobile_deal_success}
              key={id}
              sx={{
                color: "#6ac250",
              }}
              className="textPrimary"
              onClick={() => createOrder(id, row.lead_id, "mobile")}
            />,

            <GridActionsCellItem
              icon={<DeleteForeverIcon />}
              title="מחק "
              label="Delete"
              key={id}
              sx={{
                color: "red",
              }}
              className="textPrimary"
              onClick={() => handleDeleteClick(id)}
              disabled={jobById.job_status === "close" || user.user_role === 'employee'}
            />,
          ];
        }
        return [];
      },
    },
  ];

  const playScreen = async (lead_id: string, id: number) => {
    console.log('playScreen clicked with lead_id:', lead_id, 'and id:', id);
    await getJobLeadsById(true);
    setLeadJobId(id);
    setIdLead(lead_id);
    setTab("2");
  };

  // const handleButtonClick = (id: any) => {
  //   // setCurrentId(id);
  // };

  const handleSubmitModal = async (values: any, orderType: any = undefined) => {
    // disabled the functionality for now
    values.job_id = parseInt(activeJob);
    values.order_basic_info.order_type = createOrderType;
    values.order_properties.order_installation_price = parseFloat(
      values.order_properties.order_installation_price
    ).toFixed(2);
    values.order_properties.order_monthly_price = parseFloat(
      values.order_properties.order_monthly_price
    ).toFixed(2);
    if (createOrderType === "TV" || orderType === "TV") {
      values.order_properties.order_installation_payments = parseInt(
        values.order_properties.order_installation_payments
      );
      values.order_properties.tv_streamers = parseInt(
        values.order_properties.tv_streamers
      );
      values.order_properties.tv_users = parseInt(
        values.order_properties.tv_users
      );
      values.order_properties.wifi_extenders = parseInt(
        values.order_properties.wifi_extenders
      );

      delete values.order_properties.order_phone_numbers;
    }

    if (createOrderType === "mobile" || orderType === "mobile") {
      values.order_properties.order_installation_price = parseFloat(values.order_properties.order_installation_price);
      values.order_properties.order_monthly_price = parseFloat(values.order_properties.order_monthly_price);
      delete values.order_schedule;
    }
    await submitCreateOrder(values);
    // trigger only if PLAY is false;
    if (tab === "1") {
      await getJobLeadsById();
      await getJobById();
    }
    setIsCreateOrderOpen(false);
  };

  return (
    <div dir="rtl" className={className}>
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
                  <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          label="רשימה"
                          value="1"
                          icon={<ListAltIcon fontSize="small" />}
                          iconPosition="start"
                          sx={{
                            minHeight: 40,
                            padding: "0 8px",
                            gap: "4px",
                          }}
                        />
                        <Tab
                          label="PLAY"
                          value="2"
                          icon={<PlayCircleOutlineIcon fontSize="small" />}
                          iconPosition="start"
                          sx={{
                            minHeight: 40,
                            padding: "0px 8px",
                            gap: "4px",
                          }}
                        />
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
                          <div dir="ltr">
                            <Button
                              dir="ltr"
                              variant="outlined"
                              onClick={() => setIsFilterOpenFct()}
                              startIcon={<FilterListIcon />}
                              size="small"
                              sx={filterBtnStyle}
                            >
                              מסננים
                            </Button>
                          </div>
                        </Box>
                      </Box>

                      <Box >
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
                            disableRowSelectionOnClick
                            disableVirtualization
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
                            paginationMode="server"
                            pagination
                            loading={isLoading}
                            getCellClassName={getCellClassName}
                            getRowClassName={getRowClassName}
                            style={{
                              maxHeight: "53vh",
                              overflow: "auto",
                            }}
                          />
                      </Box>
                    </TabPanel>

                    {/* play screen */}
                    <TabPanel value="2">
                      <ScreenNavigationWithGrid
                        jobLeadsById={jobLeadsById}
                        leadJobId={leadJobId}
                        handleSubmitModal={handleSubmitModal}
                        activeJob={activeJob}
                        setCreateOrderType={setCreateOrderType}
                        createOrderType={createOrderType}
                      />
                    </TabPanel>
                  </TabContext>
                </CardContent>
              </Card>
            </Grid2>
          </Grid2>
        )}
        {isOpen && (
          <CustomModal
            dir="rtl"
            isOpen={isOpen}
            onClose={onCloseFct}
            title="עדכן סטטוס עבור הליד"
            width="30%"
          >
            <JobStatsModal updateStatus={updateStatus} />
          </CustomModal>
        )}

        {isCreateOrderOpen && (
          <div dir="rtl">
            <CustomModal
              dir="rtl"
              isOpen={isCreateOrderOpen}
              onClose={onCloseCreateOrder}
              title={`${
                createOrderType === "TV"
                  ? "צור הזמנה טלוויזיה"
                  : "צור הזמנה מובייל"
              }`}
              minWidth="1200px"
            >
              <GenericAddEditForm
                initialValues={initialFormValues}
                validationSchema={customValidation}
                apiRequest={handleSubmitModal}
                hasSubmitButton={true}
                submitBtnName={"save"}
                form={(formProps: any) => (
                  <JobStatsCreateOrderModal
                    formProps={formProps}
                    createOrderType={createOrderType}
                  />
                )}
                btnStyle={submitBtnStyle}
              />
            </CustomModal>
          </div>
        )}

        {isConfirmationOpen && (
          <ConfirmationModal
            open={isConfirmationOpen}
            onClose={handleCloseConfirmationModal}
            onConfirm={handleSaveConfirmationModal}
            message="האם אתה בטוח ברצונך למחוק את הליד?"
            btnName="שמור"
          />
        )}

        {isFilterOpen && (
          <Filters
            open={isFilterOpen}
            onClose={handleFiltersClose}
            handleFilter={handleFilter}
            resetFilter={resetFilter}
          >
            <FilterJobStats user={user} />
          </Filters>
        )}
      </PageContainer>
    </div>
  );
};

export default styled(JobStats)`
  ${JobsStatsStyle}
`;
