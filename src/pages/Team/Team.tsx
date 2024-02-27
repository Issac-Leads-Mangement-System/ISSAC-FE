import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { StyledTableCell, StyledTableRow } from "../../common/utils";
import AddIcon from "@mui/icons-material/Add";
import { TeamStyle } from "./TeamStyle";
import TeamApi from "../../api/team";
import TeamModal from "../../common/Modal/Teams/TeamModal";
import CloseIcon from "@mui/icons-material/Close";

const Team = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);
  const [countUsers, setCountUsers] = useState(0);
  const [type, setType] = useState("");
  const [id, setId] = useState<null | number>(null);

  const handleEditClick = (id: number): any => {
    setId(id);
    setType("Edit");
    setOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    TeamApi.deleteUser(id);
    // setUserList(userList.filter((user: any) => user.id !== id));
    setCountUsers(countUsers - 1);
    getTeams();
  };

  const getTeams = async () => {
    try {
      const response = await TeamApi.getTeams(page);
      if (response?.data?.teams_response?.length > 0) {
        setUserList(response.data.teams_response);
        setCountUsers(response.data.counter_teams);
      }
      if (response?.data?.length > 0) {
        setUserList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeams();
  }, [open]);

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    try {
      const response: any = await TeamApi.changePage(newPage, rowsPerPage);
      if (response?.data?.teams_response?.length > 0) {
        setUserList(response.data.teams_response);
      } else if (response?.data?.length > 0) {
        setUserList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNewUser = () => {
    setOpen(true);
    setId(null);
    setType("Add");
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setRowsPerPage(parseInt(event.target.value, 10));
      const response = await TeamApi.changeRowsPerPage(
        event.target.value,
        page
      );
      if (response?.data?.teams_response?.length > 0) {
        setUserList(response.data.teams_response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${className} test`}>
      <h2 className="title">Team</h2>

      <div>
        <Button
          className="issac-user-button"
          variant="outlined"
          sx={{
            float: "right",
            marginBottom: "5px",
            "&:hover": {
              backgroundColor: "#000000d4",
            },
          }}
          onClick={() => addNewUser()}
          startIcon={<AddIcon />}
          size="small"
        >
          Add team
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Team name</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList && userList.length > 0 ? (
              userList.map((row: any) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.team_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <EditIcon onClick={() => handleEditClick(row.id)} />
                    <DeleteIcon onClick={() => handleDeleteClick(row.id)} />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableCell>No data to display</StyledTableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={countUsers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {open && <TeamModal open={open} setOpen={setOpen} type={type} id={id} />}
      <Box sx={{ width: 500 }}>
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={5000}
          message="Test"
        >
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Click the close icon to see the Collapse transition in action!
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default styled(Team)`
  ${TeamStyle}
`;
