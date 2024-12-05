import { useEffect } from "react";
import { PageContainer } from "../../common/PageContainer/page-container";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import { SearchInput } from "../../common/Input/SearchInput";

export const JobStats = () => {
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();

  useEffect(() => {
    setSecontToolbarMessage("JOB LEADS");
    setSecontToolbarPath("Stats");

    return () => {
      resetSecondToolbar();
    };
  }, []);
  const handleSearchInputChange = (event: any) => {
    console.log("handle search fct");
  };
  return (
    <PageContainer>
      <Grid2
        container
        spacing={2}
        justifyContent="center"
        sx={{ background: "#f2f2f7", width: "100%" }}
      >
        {/* Card 1 */}
        <Grid2>
          <Card
            sx={{
              transition: "all 0.4s ",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
              },
              width: "335px",
              height: "160px",
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'medium' }}>Total 10</Typography>
              <Typography variant="body2">
                Total employee: 0
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Card 2 */}
        <Grid2>
          <Card
            sx={{
              transition: "all 0.4s ",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
              },
              width: "335px",
              height: "160px",
            }}
          >
            <CardContent>
              <Typography variant="h5" color={'#856404'} sx={{ fontWeight: 'medium' }}>Open</Typography>
              <Typography variant="body2">
                This is another simple card with the same hover effect.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2>
          <Card
            sx={{
              transition: "all 0.4s ",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
              },
              width: "335px",
              height: "160px",
            }}
          >
            <CardContent>
              <Typography variant="h5" color={'#155724'} sx={{ fontWeight: 'medium' }}>Success</Typography>
              <Typography variant="body2">
                This is another simple card with the same hover effect.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2>
          <Card
            sx={{
              transition: "all 0.4s ",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
              },
              width: "335px",
              height: "160px",
            }}
          >
            <CardContent>
              <Typography variant="h5" color={'red'} sx={{ fontWeight: 'medium' }}>Close</Typography>
              <Typography variant="body2">
                This is another simple card with the same hover effect.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
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
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                }
              }}
            />
          </Box>

          {/* <DataGrid
            rows={teams}
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
          /> */}
        </CardContent>
      </Card>
    </PageContainer>
  );
};
