import styled from "styled-components";
import { AddJobsStyle } from "./addJobsStyle";
import { PageContainer } from "../../common/PageContainer/page-container";
import { useEffect, useState } from "react";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  Grid2,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import leadsTypesStore from "../../store/Leads/types-store";
import jobsStore from "../../store/Jobs/jobs-store";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../../store/Notification/notification-store";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Loader } from "../../common/Loader/Loader";
const AddJobs = () => {
  const navigate = useNavigate();
  const { setSecontToolbarMessage, setSecontToolbarPath }: any =
    secondToolbarStore();
  const { types, getTypes }: any = leadsTypesStore();
  const {
    job,
    setJob,
    getFreeLeads,
    getUserTeam,
    userTeam,
    setLeadsPerEmployee,
    createInProgressJob,
    createLeadsJob,
    resetStore,
    infoLeadsMessage,
    getAllJobs,
    userSelected,
    setUserSelected,
    isLoading,
  }: any = jobsStore();
  const { showNotification }: any = useNotificationStore();
  const steps = ["Choose Job Type", "Add Job Details", "Confirm and Create"];
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = async (step: number) => {
    if (step === 0) {
      setActiveStep((prev) => prev + 1);
    }
    if (step === 1) {
      const total = job.leads_per_employee.reduce(
        (sum: any, item: any) => sum + item.value,
        0
      );
      if (total !== job.free_leads) {
        showNotification({
          message: `An error occurred: The total number of leads exceeds the configured limit. Please review the configuration settings.`,
        });
      } else {
        setActiveStep((prev) => prev + 1);
        await createInProgressJob();
      }
    }
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const distributeValues = (maxValue: number, users: any[]) => {
    const userCount = users.length;
    const baseValue = Math.floor(maxValue / userCount);
    const surplus = maxValue % userCount;

    const values = Array(userCount).fill(baseValue);
    for (let i = 0; i < surplus; i++) {
      values[i] += 1;
    }

    users.forEach((user, index) => {
      user.value = values[index];
    });
    setJob(users, "leads_per_employee");
  };

  useEffect(() => {
    setSecontToolbarMessage("CREATE JOB");
    setSecontToolbarPath("Add");
    getTypes(0, 50);
    getUserTeam();

    return () => {
      resetStore();
    };
  }, [getUserTeam]);

  useEffect(() => {
    if (parseInt(job.free_leads) >= 0) {
      distributeValues(job.free_leads, job.leads_per_employee);
    }
  }, [job.free_leads]);

  const changeTypeId = (e: any, key: string) => {
    setJob(e.target.value, key);
    if (key === "type_id") {
      getFreeLeads();
    }
  };

  const changeUser = (e: any) => {
    const findUser = userTeam.filter((lead: any) =>
      e?.target.value.includes(lead.id)
    );
    setUserSelected(e.target.value);
    setJob(findUser, "leads_per_employee");
    distributeValues(job.free_leads, findUser);
  };

  const handleInputChange = (value: any, id: any) => {
    const inputValue = value;
    if (/^\d*$/.test(inputValue)) {
      setLeadsPerEmployee(id, value);
    }
  };

  const handleChangeLeads = (event: any) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    if (/^\d*$/.test(inputValue)) {
      if (numericValue <= infoLeadsMessage) {
        setJob(parseInt(numericValue), "free_leads");
      } else {
        showNotification({
          message: `Value can't be bigger than ${infoLeadsMessage}!`,
        });
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    const deleteJob = job.leads_per_employee.find((job: any) => job.id === id);
    if (deleteJob) {
      job.leads_per_employee = job.leads_per_employee.filter(
        (job: any) => job.id !== deleteJob.id
      );
      setJob(job.leads_per_employee, "leads_per_employee");
      const newUserSelected = userSelected.filter(
        (user: any) => user !== deleteJob.user_id
      );
      setUserSelected(newUserSelected);
      distributeValues(job.free_leads, job.leads_per_employee);
    }
  };

  const columns: any = [
    { field: "first_name", headerName: "First Name", width: 200 },
    {
      field: "value",
      headerName: "Value",
      width: 200,
      renderCell: (params: any) => {
        return (
          <TextField
            type="text"
            value={params.value}
            onChange={(e) =>
              handleInputChange(Number(e.target.value), params.id)
            }
            fullWidth
          />
        );
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
              icon={<DeleteForeverIcon />}
              label="Previw"
              key={id}
              sx={{
                color: "red",
              }}
              className="textPrimary"
              onClick={() => handleDeleteClick(id)}
            />,
          ];
        }
        return [];
      },
    },
  ];

  const createJob = async () => {
    await createLeadsJob();
    await getAllJobs();
    navigate("/jobs");
  };

  return (
    <PageContainer>
      <Box
        sx={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1 */}
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {activeStep === 0 && (
            <Card
              sx={{
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  gap="10px"
                  marginBottom="20px"
                >
                  <Box
                    sx={{
                      backgroundColor: "#4caf50",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    1
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    Step 1: Choose Job Type
                  </Typography>
                </Box>
                <Grid2 container spacing={2}>
                  <Grid2 size={6}>
                    <InputLabel
                      id="type"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "8px",
                      }}
                    >
                      Job Type
                    </InputLabel>
                    <Select
                      labelId="type"
                      id="role-select"
                      value={job.type_id || ""}
                      onChange={(e) => changeTypeId(e, "type_id")}
                      sx={{
                        width: "100%",
                        height: "56px",
                        fontSize: "1rem",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                      }}
                    >
                      {types?.map((team: any) => (
                        <MenuItem key={crypto.randomUUID()} value={team.id}>
                          {team.type_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {job.type_id && job.free_leads > -1 && (
                      <Box
                        sx={{
                          marginTop: "16px",
                          padding: "12px",
                          backgroundColor: "#e8f5e9",
                          border: "1px solid #c8e6c9",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: "#4caf50",
                            color: "#fff",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "14px",
                          }}
                        >
                          ✓
                        </Box>
                        <Typography
                          sx={{
                            color: "#388e3c",
                            fontWeight: "bold",
                            fontSize: "1rem",
                          }}
                        >
                          {infoLeadsMessage} leads available!
                        </Typography>
                      </Box>
                    )}
                  </Grid2>
                  {job.type_id && job.free_leads > -1 && (
                    <Grid2 size={4}>
                      <InputLabel
                        id="type"
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          paddingBottom: "8px",
                        }}
                      >
                        Configuration
                      </InputLabel>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Leads"
                          variant="outlined"
                          value={job.free_leads}
                          onChange={(e) => handleChangeLeads(e)}
                          sx={{ paddingBottom: "10px" }}
                        />
                        <TextField
                          label="Job Name"
                          value={job.job_name}
                          onChange={(e) => changeTypeId(e, "job_name")}
                          size="medium"
                          sx={{
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                          }}
                        />
                      </Box>
                    </Grid2>
                  )}
                </Grid2>

                {job.type_id && job.free_leads > -1 && (
                  <>
                    <Box
                      sx={{
                        marginTop: "16px",
                      }}
                    ></Box>
                  </>
                )}
              </CardContent>

              <Box sx={{ textAlign: "right", marginTop: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext(0)}
                  disabled={!job.type_id}
                >
                  Next
                </Button>
              </Box>
            </Card>
          )}

          {/* Step 2 */}

          {activeStep === 1 && (
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
                padding: "20px",
                maxWidth: "800px",
                width: "100%",
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="12px"
                  marginBottom="24px"
                >
                  <Box
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    2
                  </Box>
                  <Typography variant="h6" fontWeight="bold" textAlign="center">
                    Step 2: Add Job Name
                  </Typography>
                </Box>
                <Box marginBottom="24px">
                  <InputLabel
                    id="type"
                    sx={{
                      fontWeight: "bold",
                      color: "#555",
                      marginBottom: "8px",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    Select a user
                  </InputLabel>
                  <Select
                    labelId="type"
                    id="role-select"
                    value={userSelected}
                    multiple
                    renderValue={(selected) =>
                      `You selected ${selected.length} users`
                    }
                    onChange={(e) => changeUser(e)}
                    sx={{
                      width: "100%",
                      maxWidth: "400px",
                      height: "56px",
                      fontSize: "1rem",
                      borderRadius: "8px",
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #ddd",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      margin: "0 auto",
                      display: "block",
                    }}
                  >
                    {userTeam?.map((team: any) => (
                      <MenuItem key={crypto.randomUUID()} value={team.id}>
                        <Checkbox checked={userSelected.includes(team.id)} />
                        <ListItemText primary={team.first_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    padding: "10px",
                    overflow: "hidden",
                  }}
                >
                  <DataGrid
                    autoHeight
                    sx={{
                      "& .MuiDataGrid-root": {
                        border: "none",
                      },
                      "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid #f0f0f0",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f5f5f5",
                        borderBottom: "2px solid #ddd",
                        fontWeight: "bold",
                      },
                    }}
                    rows={job.leads_per_employee}
                    columns={columns}
                  />
                </Box>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 3,
                }}
              >
                <Button onClick={handleBack}>Back</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext(1)}
                >
                  Next
                </Button>
              </Box>
            </Card>
          )}

          {activeStep === 2 && (
            <Card sx={{ padding: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Step 3: Confirm and Create Job
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Summary
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  <strong>Job Type:</strong>{" "}
                  {types.find((t: any) => t.id === job.type_id)?.type_name ||
                    "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Job Name:</strong> {job.job_name || "N/A"}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Assigned Users:</strong>
                </Typography>
                <ul>
                  {job.leads_per_employee?.map((emp: any) => {
                    const user = userTeam.find(
                      (u: any) => u.id === emp.user_id
                    );
                    return (
                      <li key={emp.id}>
                        {user?.first_name || "Unknown User"} - {emp.value} leads
                      </li>
                    );
                  })}
                </ul>
                <Typography variant="body1">
                  <strong>Total Leads:</strong> {job.free_leads || 0}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 3,
                }}
              >
                {/* <Button onClick={handleBack}>Back</Button> */}
                <Button variant="contained" color="success" onClick={createJob}>
                  Create Job
                </Button>
              </Box>
            </Card>
          )}
        </Box>
      </Box>

      {isLoading && <Loader />}
    </PageContainer>
  );
};

export default styled(AddJobs)`
  ${AddJobsStyle}
`;
