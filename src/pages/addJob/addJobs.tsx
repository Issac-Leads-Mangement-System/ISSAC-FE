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
  Divider,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import leadsTypesStore from "../../store/Leads/types-store";
import jobsStore from "../../store/Jobs/jobs-store";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../../store/Notification/notification-store";

const AddJobs = () => {
  const navigate = useNavigate();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const maxValue = 500;
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
  }: any = jobsStore();
  const { showNotification }: any = useNotificationStore();
  const [leadInputValue, setLeadInputvalue] = useState("");
  const [inputValues, setInputValues]: any = useState({});
  const [rows, setRows]: any = useState({});
  const [isNextStep, setIsNextStep]: any = useState(false);

  // const distributeValues = (maxValue: any, userCount: any) => {
  //   const baseValue = Math.floor(maxValue / userCount);
  //   const surplus = maxValue % userCount;

  //   const values = Array(userCount).fill(baseValue);
  //   for (let i = 0; i < surplus; i++) {
  //     values[i] += 1;
  //   }
  //   return values;
  // };

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

  const columns = [
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
  ];

  const nextStep = () => {
    if (job.type_id && inputValues) {
      createInProgressJob();
      setIsNextStep(true);
    }
  };

  const createJob = async () => {
    const total = job.leads_per_employee.reduce(
      (sum: any, item: any) => sum + item.value,
      0
    );
    if (total > job.free_leads) {
      showNotification({
        message: `An error occurred: The total number of leads exceeds the configured limit. Please review the configuration settings.`,
      });
    } else {
      await createLeadsJob();
      await getAllJobs();
      navigate("/jobs");
    }
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
        <Grid2 container spacing={4} alignItems="flex-start">
          {/* Step 1 */}
          <Grid2 size={12}>
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
            </Card>
          </Grid2>

          {job.type_id && job.free_leads >= 0 && (
            <Grid2 size={12}>
              <Box
                sx={{
                  marginTop: "30px",
                  textAlign: "center",
                }}
              >
                <Divider />
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: "20px",
                    color: "#555",
                    marginBottom: "20px",
                  }}
                >
                  <Button onClick={nextStep}>Next step</Button>
                </Typography>
                <Divider />
              </Box>
            </Grid2>
          )}

          {/* Step 2 */}
          {isNextStep && job.free_leads >= 0 && (
            <Grid2 size={12}>
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
                        backgroundColor: "#ff9800",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      2
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      Step 2: Add Job Name
                    </Typography>
                  </Box>
                  <Box>
                    {job.type_id && job.free_leads > -1 && (
                      <DataGrid
                        sx={{ width: "420px" }}
                        rows={job.leads_per_employee}
                        columns={columns}
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          )}
        </Grid2>

        {job.type_id && job.free_leads >= 0 && isNextStep && (
          <Box
            sx={{
              marginTop: "30px",
              textAlign: "center",
            }}
          >
            <Divider />
            <Typography
              variant="body1"
              sx={{ marginTop: "20px", color: "#555" }}
            >
              <Button onClick={createJob}>Create the job</Button>
            </Typography>
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};

export default styled(AddJobs)`
  ${AddJobsStyle}
`;
