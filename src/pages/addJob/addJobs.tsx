import styled from "styled-components";
import { AddJobsStyle } from "./addJobsStyle";
import { PageContainer } from "../../common/PageContainer/page-container";
import { useEffect, useState } from "react";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import {
  Box,
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

const userTeamMock = [
  {
    id: 50,
    first_name: "ירין",
    last_name: "מויאל",
    team_id: 1,
    team_name: "Itzik Team",
    email: "yarin@gmail.com",
    phone_number: "050-1231234",
    user_role: "employee",
    user_status: "active",
    created_date: "2024-11-08",
  },
  {
    id: 16,
    first_name: "Yuval",
    last_name: "Poroch",
    team_id: 1,
    team_name: "Itzik Team",
    email: "test123@qq.com",
    phone_number: "111111111111111",
    user_role: "employee",
    user_status: "active",
    created_date: "2024-11-03",
  },
  {
    id: 49,
    first_name: "ליטל",
    last_name: "אדרי",
    team_id: 1,
    team_name: "Itzik Team",
    email: "lital@gmail.com",
    phone_number: "050-1231234",
    user_role: "employee",
    user_status: "active",
    created_date: "2024-11-08",
  },
  {
    id: 51,
    first_name: "שלי",
    last_name: "לובן",
    team_id: 1,
    team_name: "Itzik Team",
    email: "shali@gmail.com",
    phone_number: "050-1231234",
    user_role: "employee",
    user_status: "active",
    created_date: "2024-11-08",
  },
  {
    id: 52,
    first_name: "שילה",
    last_name: "משה",
    team_id: 1,
    team_name: "Itzik Team",
    email: "shila@gmail.com",
    phone_number: "050-1231234",
    user_role: "employee",
    user_status: "active",
    created_date: "2024-11-08",
  },
  {
    id: 53,
    first_name: "אדם",
    last_name: "קסטיליה",
    team_id: 1,
    team_name: "Itzik Team",
    email: "adam@gmail.com",
    phone_number: "050-1231234",
    user_role: "employee",
    user_status: "active",
    created_date: "2024-11-08",
  },
  {
    id: 54,
    first_name: "טום",
    last_name: "שושן",
    team_id: 1,
    team_name: "Itzik Team",
    email: "tom@gmail.com",
    phone_number: "050-1231234",
    user_role: "employee",
    user_status: "active",
    created_date: "2024-11-08",
  },
  {
    id: 55,
    first_name: "עידו",
    last_name: "טיבי",
    team_id: 1,
    team_name: "Itzik Team",
    email: "ido@gmail.com",
    phone_number: "050-1231234",
    user_role: "employee",
    user_status: "active",
    created_date: "2024-11-08",
  },
]
const AddJobs = () => {
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const maxValue = 500;
  const { types, getTypes }: any = leadsTypesStore();
  const { job, setJob, getFreeLeads, getUserTeam, userTeam }: any = jobsStore();
 

  const distributeValues = (maxValue: any, userCount: any) => {
    const baseValue = Math.floor(maxValue / userCount); // Valoarea de bază
    const surplus = maxValue % userCount; // Surplusul care rămâne

    const values = Array(userCount).fill(baseValue);
    for (let i = 0; i < surplus; i++) {
      values[i] += 1; // Distribuim surplusul primilor utilizatori
    }
    return values;
  };

  const initialValues = distributeValues(maxValue, userTeamMock.length);

  const [inputValues, setInputValues] = useState(
    userTeamMock.reduce((acc: any, user: any, index: any) => {
      acc[user.id] = initialValues[index];
      return acc;
    }, {})
  );

  useEffect(() => {
    setSecontToolbarMessage("CREATE JOB");
    setSecontToolbarPath("Add");
    if (!types.length) {
      getTypes(0, 50);
      getUserTeam();
    }
  }, []);

  const changeTypeId = (e: any, key: string) => {
    setJob(e.target.value, key);
    if (key === "type_id") {
      getFreeLeads();
    }
  };

  const handleInputChange = (value: any, id: any) => {
    setInputValues((prev: any) => ({
      ...prev,
      [id]: Math.min(maxValue, Math.max(0, value)), // Asigurăm limitele
    }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "first_name", headerName: "First Name", width: 200 },
    {
      field: "value",
      headerName: "Value",
      width: 200,
      renderCell: (params: any) => {
        const index = params.id; // Indexul curent al rândului
        console.log("kkkkkkkkkkk inputValues", inputValues);
        return (
          <TextField
            type="number"
            value={inputValues[params.id]}
            onChange={(e) =>
              handleInputChange(Number(e.target.value), params.id)
            }
            inputProps={{
              min: 0,
              max: maxValue,
            }}
            fullWidth
          />
        );
      },
    },
  ];

  const rows = userTeam.map((user: any, index: any) => ({
    id: user.id,
    first_name: user.first_name,
    value: inputValues[index],
  }));

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
                  <>
                    <Box
                      sx={{
                        marginTop: "16px",
                        padding: "12px",
                        backgroundColor: "#e8f5e9", // Fundal verde deschis
                        border: "1px solid #c8e6c9", // Bordură verde subtilă
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#4caf50", // Verde
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
                          color: "#388e3c", // Verde închis
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        {job.free_leads} leads available!
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        marginTop: "16px",
                      }}
                    >
                      <TextField
                        label="Job Name"
                        value={job.job_name}
                        onChange={(e) => changeTypeId(e, "job_name")}
                        fullWidth
                        size="medium"
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid2>

          {/* Step 2 */}
          {job.type_id && (
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
                  {job.type_id && job.free_leads > -1 && (
                    <DataGrid rows={rows} columns={columns} />
                  )}
                </CardContent>
              </Card>
            </Grid2>
          )}
        </Grid2>

        {job.type_id && (
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
              Continue to finalize the job details.
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
