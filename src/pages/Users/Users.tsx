import React, { useEffect, useState } from "react";
import {
  Button,
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
import { UsersStyle } from "./UsersStyle";
import styled from "styled-components";
import { StyledTableCell, StyledTableRow } from "../../common/utils";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import UserApi from "../../api/users";
import UserModal from "../../common/Modal/User/UserModal";

const Users = ({ className }: any) => {
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
    UserApi.deleteUser(id);
    setUserList(userList.filter((user: any) => user.id !== id));
    setCountUsers(countUsers - 1);
  };

  const token: any = localStorage.getItem("authToken");
  const getUsers = async () => {
    try {
      const response = await UserApi.getUsers(page);
      if (response?.data?.users_response?.length > 0) {
        setUserList(response.data.users_response);
        setCountUsers(response.data.counter_users);
      }
      if (response?.data?.length > 0) {
        setUserList(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [open]);

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    try {
      const response = await axios.post(
        `https://issac-service-app-now-7jji5at5aa-ue.a.run.app/users/?page=${
          newPage + 1
        }&limit=${rowsPerPage}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.users_response?.length > 0) {
        setUserList(response.data.users_response);
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
      const response = await axios.post(
        `https://issac-service-app-now-7jji5at5aa-ue.a.run.app/users/?page=${
          page === 0 ? page + 1 : page
        }&limit=${parseInt(event.target.value, 10)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.users_response?.length > 0) {
        setUserList(response.data.users_response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${className} test`}>
      <h2 className="title">Users</h2>

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
          Add user
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First name</StyledTableCell>
              <StyledTableCell>Last name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Lead</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList && userList.length > 0 ? (
              userList.map((row: any) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.first_name}
                  </StyledTableCell>
                  <StyledTableCell>{row.last_name}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.user_role}</StyledTableCell>
                  <StyledTableCell>{row.team_name}</StyledTableCell>
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
      {open && <UserModal open={open} setOpen={setOpen} type={type} id={id} />}
    </div>
  );
};

export default styled(Users)`
  ${UsersStyle}
`;
