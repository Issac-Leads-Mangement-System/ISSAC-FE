import styled from "styled-components";
import { AddJobsStyle } from "./addJobsStyle";
import { PageContainer } from "../../common/PageContainer/page-container";
import { useEffect } from "react";
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

const AddJobs = () => {
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const { types, getTypes }: any = leadsTypesStore();
  const { job, setJob,getFreeLeads }: any = jobsStore();
  useEffect(() => {
    setSecontToolbarMessage("CREATE JOB");
    setSecontToolbarPath("Add");
    if (!types.length) {
      getTypes(0, 50);
    }
  }, []);

  const changeTypeId = (e: any, key: string) => {
    setJob(e.target.value, key);
    if(key === 'type_id'){
      getFreeLeads();
    }
  };

  console.log("zz types", job);
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
