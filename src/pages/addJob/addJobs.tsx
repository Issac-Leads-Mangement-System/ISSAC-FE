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
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import useNotificationStore from "../../store/Notification/notification-store";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Loader } from "../../common/Loader/Loader";
import { ErrorMessage } from "formik";
const AddJobs = ({ className }: any) => {
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
  const apiRef = useGridApiRef();
  const { showNotification }: any = useNotificationStore();
  const steps = [
    "בחר סוג ליד לעבודה",
    "בחר ושייך לידים עבור העבודים",
    "אשר וצור עבודה",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = async (step: number) => {
    if (step === 0) {
      const total = job.leads_per_employee.reduce(
        (sum: any, item: any) => sum + item.value,
        0
      );
      if (job.free_leads === 0) {
        showNotification({
          message: "שגיאה: אין לידים זמינים",
        });
        return;
      }
      if (!job.job_name) {
        showNotification({
          message: "שגיאה: אנא הוסף שם לעבודה",
        });
        return;
      }
      if (total !== job.free_leads) {
        showNotification({
          message: `שגיאה: מספר הלידים שדרשת גבוה ממספר הלידים הזמינים`,
        });
        return;
      } else {
        try {
          await createInProgressJob();
          setActiveStep((prev) => prev + 1);
        } catch (err) {
          console.log(err);
        }
      }
    }
    if (step === 1) {
      const total = job.leads_per_employee.reduce(
        (sum: any, item: any) => sum + item.value,
        0
      );
      if (total !== job.free_leads) {
        showNotification({
          message: `שגיאה: מספר הלידים שדרשת גבוה ממספר הלידים הזמינים`,
        });
        return;
      } else {
        setActiveStep((prev) => prev + 1);
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
    setSecontToolbarMessage("עבדות");
    setSecontToolbarPath("הוסף עבודה");
    getTypes(0, 50);
    getUserTeam(false);

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
    if (e.target.value) {
      const findUser = userTeam.filter((lead: any) =>
        e?.target.value.includes(lead.id)
      );
      setUserSelected(e.target.value);
      setJob(findUser, "leads_per_employee");
      distributeValues(job.free_leads, findUser);
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
    let numericValue = inputValue.replace(/\D/g, "");
    if (!numericValue) {
      numericValue = 0;
    }

    if (/^\d*$/.test(inputValue)) {
      if (numericValue <= infoLeadsMessage) {
        setJob(parseInt(numericValue), "free_leads");
      } else {
        showNotification({
          message: `מספר הלידים לא יכול להיות יותר מ${infoLeadsMessage}`,
        });
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    if (job.leads_per_employee.length === 0) return;
    if (id) {
      const deleteJob = job.leads_per_employee.find(
        (job: any) => job.id === id
      );

      if (deleteJob) {
        job.leads_per_employee = job.leads_per_employee.filter(
          (job: any) => job?.id !== deleteJob?.id
        );
        setJob(job.leads_per_employee, "leads_per_employee");
        const newUserSelected = userSelected.filter(
          (user: any) => user !== deleteJob?.id
        );
        setUserSelected(newUserSelected || []);
        distributeValues(job.free_leads, job.leads_per_employee);
      }
    }
  };

  const columns: any = [
    {
      field: "first_name",
      headerName: "שם",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "value",
      headerName: "לידים",
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        if (!params.id) return null;
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
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      editable: false,
      headerName: "פעולות",
      filterable: false,
      cellClassName: "pinned-column",
      headerClassName: "MuiDataGrid-columnHeader--pinned",
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Previw"
          key={params.id}
          sx={{
            color: "red",
          }}
          className="textPrimary"
          onClick={() => handleDeleteClick(params.id)}
        />,
      ],
    },
  ];

  const createJob = async () => {
    await createLeadsJob();
    await getAllJobs();
    navigate("/jobs");
  };

  const accumulateJobLeads = job.leads_per_employee.reduce(
    (sum: any, item: any) => sum + item.value,
    0
  );
  return (
    <div className={`${className}`}>
      <PageContainer>
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#f9f9f9",
            // minHeight: "100vh",
            height: "auto",
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
                      שלב 1: בחר את סוג הליד וכמות עבור העבודה
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
                        סוג ליד
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
                            {infoLeadsMessage} לידים פנויים!
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
                          הגדרות
                        </InputLabel>
                        <Box>
                          <TextField
                            id="outlined-basic"
                            label="לידים"
                            variant="outlined"
                            value={job.free_leads}
                            onChange={(e) => handleChangeLeads(e)}
                            sx={{ paddingBottom: "10px" }}
                          />
                          <TextField
                            label="שם העבודה"
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
                  <Box sx={{ textAlign: "right", marginTop: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleNext(0)}
                      disabled={!job.type_id}
                    >
                      הבא
                    </Button>
                  </Box>
                </CardContent>
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
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      שלב 2: בחר עובדים ושייך לידים עבור העבודה
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
                      בחר עובדים
                    </InputLabel>
                    <Select
                      labelId="type"
                      id="role-select"
                      value={userSelected}
                      multiple
                      renderValue={(selected) =>
                        ` ${selected.length} עובדים נבחרו `
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
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "#555",
                        marginBottom: "8px",
                        display: "block",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      מספר לידים שנבחרו: {job.free_leads}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color:
                          accumulateJobLeads === job.free_leads
                            ? "green"
                            : "red",
                        marginBottom: "8px",
                        display: "block",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      מספר לידים ששוייכו: {accumulateJobLeads}
                    </Typography>
                  </Box>
                  <Box
                    dir="ltr"
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      padding: "10px",
                      overflow: "auto", // Adaug scroll
                      maxHeight: "400px", // Scroll vertical
                      maxWidth: "100%", // Scroll orizontal dacă e cazul
                    }}
                  >
                    <DataGrid
                      apiRef={apiRef}
                      sx={{
                        "& .MuiDataGrid-root": {
                          border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                          borderBottom: "1px solid rgb(90, 67, 67)",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                          backgroundColor: "#f5f5f5",
                          borderBottom: "2px solid #ddd",
                          fontWeight: "bold",
                        },
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                          outline: "none !important",
                        },
                      }}
                      slots={{
                        noRowsOverlay: () => <div>No data available</div>,
                      }}
                      columns={[...columns].reverse() || []}
                      rows={job.leads_per_employee || []}
                      disableColumnFilter
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNext(1)}
                  >
                    הבא
                  </Button>
                </Box>
              </Card>
            )}

            {activeStep === 2 && (
              <Card sx={{ padding: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  שלב 3: אשר וצור עבודה
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    סיכום
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 1 }}>
                    <strong>סוג הליד:</strong>{" "}
                    {types.find((t: any) => t.id === job.type_id)?.type_name ||
                      "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>שם העבודה:</strong> {job.job_name || "N/A"}
                  </Typography>
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    <strong>עובדים משוייכים:</strong>
                  </Typography>
                  <ul>
                    {job.leads_per_employee?.map((emp: any) => {
                      return (
                        <li key={emp.id}>
                          {emp?.first_name || "Unknown User"} - {emp.value}{" "}
                          לידים
                        </li>
                      );
                    })}
                  </ul>
                  <Typography variant="body1">
                    <strong>סה"כ לידים:</strong> {job.free_leads || 0}
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
                  <Button onClick={handleBack}>אחורה</Button>

                  <Button
                    variant="contained"
                    color="success"
                    onClick={createJob}
                  >
                    צור עבודה
                  </Button>
                </Box>
              </Card>
            )}
          </Box>
        </Box>

        {isLoading && <Loader />}
      </PageContainer>
    </div>
  );
};

export default styled(AddJobs)`
  ${AddJobsStyle}
`;
