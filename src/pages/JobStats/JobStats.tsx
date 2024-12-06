import { useEffect } from "react";
import { PageContainer } from "../../common/PageContainer/page-container";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import { SearchInput } from "../../common/Input/SearchInput";
import jobStatsStore from "../../store/Jobs/job-stats-store";
import { useLocation } from "react-router-dom";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
  }: any = jobStatsStore();

  useEffect(() => {
    setSecontToolbarMessage("JOB LEADS");
    setSecontToolbarPath("Stats");
    console.log("zzz activeJob", activeJob);
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
    }
  }, [activeJob]);
  const handleSearchInputChange = (event: any) => {
    console.log("handle search fct");
  };

  const columns: GridColDef<(typeof jobById)[number]>[] = [
    { field: "job_name", headerName: "Job name", width: 250 },
    { field: "created_time", headerName: "Created time", width: 150 },
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
          {/* Card 1 */}

          {/* <Grid2>
            <Card
              sx={{
                transition: "all 0.4s",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                },
                width: "335px",
                height: "160px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent>
                
                <SupervisedUserCircleIcon
                  sx={{
                    fontSize: 50,
                    color: "#5a5a5a",
                    marginBottom: 2,
                  }}
                />
                
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Total: {jobById.total_leads}{" "}
                </Typography>
                
                <Typography variant="body2" sx={{ color: "#666" }}>
                  Total employee {jobById.leads_user_info.total_leads_user}
                </Typography>
              </CardContent>
            </Card>
          </Grid2> */}

          <Grid2>
            <Card
              sx={{
                transition: "all 0.4s",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                },
                width: "335px",
                height: "120px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
              }}
            >
              {/* Conținutul din stânga */}
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "medium",
                    color: "#333",
                    marginBottom: "8px",
                  }}
                >
                  Total
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {jobById.total_leads}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                  }}
                >
                  employee: {jobById.leads_user_info.total_leads_user}
                </Typography>
              </Box>

              {/* Iconul din dreapta */}
              <Box
                sx={{
                  backgroundColor: "#eaeafd8a", // Roz pal
                  borderRadius: "8px",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SupervisedUserCircleIcon
                  sx={{ fontSize: 30, fontWeight: "medium" }}
                />{" "}
                {/* Icon roșu */}
              </Box>
            </Card>
          </Grid2>

          {/* Card 2 */}

          <Grid2>
            <Card
              sx={{
                transition: "all 0.4s",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                },
                width: "335px",
                height: "120px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
              }}
            >
              {/* Conținutul din stânga */}
              <Box>
                <Typography
                  variant="body1"
                  color={"#856404"}
                  sx={{
                    fontWeight: "medium",
                    color: "#5a5a5a",
                    marginBottom: "8px",
                  }}
                >
                  Open
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {jobById.open_leads}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                  }}
                >
                  employee: {jobById.leads_user_info.open_leads_user}
                </Typography>
              </Box>

              {/* Iconul din dreapta */}
              <Box
                sx={{
                  backgroundColor: "#eaf1fd", // Roz pal
                  borderRadius: "8px",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PlayCircleOutlineIcon
                  sx={{ fontSize: 30, fontWeight: "medium", color: "#5a5a5a" }}
                />{" "}
                {/* Icon roșu */}
              </Box>
            </Card>
          </Grid2>

          {/* Card 3 */}
          <Grid2>
            <Card
              sx={{
                transition: "all 0.4s",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                },
                width: "335px",
                height: "120px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
              }}
            >
              {/* Conținutul din stânga */}
              <Box>
                <Typography
                  variant="body1"
                  color={"#856404"}
                  sx={{
                    fontWeight: "medium",
                    color: "#155724",
                    marginBottom: "8px",
                  }}
                >
                  Success
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#155724",
                  }}
                >
                  {jobById.success_leads}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                  }}
                >
                  employee: {jobById.leads_user_info.success_leads_user}
                </Typography>
              </Box>

              {/* Iconul din dreapta */}
              <Box
                sx={{
                  backgroundColor: "#e5f9df", // Roz pal
                  borderRadius: "8px",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 30, fontWeight: "medium", color: "#155724" }}
                />{" "}
                {/* Icon roșu */}
              </Box>
            </Card>
          </Grid2>

          {/* Card 4 */}

          <Grid2>
            <Card
              sx={{
                transition: "all 0.4s",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  transform: "translateY(-2px)",
                },
                width: "335px",
                height: "120px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
              }}
            >
              {/* Conținutul din stânga */}
              <Box>
                <Typography
                  variant="body1"
                  color={"#856404"}
                  sx={{
                    fontWeight: "medium",
                    color: "red",
                    marginBottom: "8px",
                  }}
                >
                  Closed
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {jobById.closed_leads}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                  }}
                >
                  employee: {jobById.leads_user_info.closed_leads_user}
                </Typography>
              </Box>

              {/* Iconul din dreapta */}
              <Box
                sx={{
                  backgroundColor: "#fdecea", // Roz pal
                  borderRadius: "8px",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BlockIcon
                  sx={{ fontSize: 30, fontWeight: "medium", color: "red" }}
                />{" "}
                {/* Icon roșu */}
              </Box>
            </Card>
          </Grid2>

          <Grid2 size={12}>
            <Card sx={{ marginTop: "15px" }}>
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
                    onKeyDown={(
                      event: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                      }
                    }}
                  />
                </Box>

                <DataGrid
                  // rows={jobLeadsById}
                  rows={[]}
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
                  }}
                  // rowCount={count}
                  disableRowSelectionOnClick
                  disableVirtualization
                  paginationMode="server"
                  pagination
                  // loading={isLoading}
                />
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      )}
    </PageContainer>
  );
};
