import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
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
import UserApi from "../../api/users";
import UserModal from "../../common/Modal/User/UserModal";
import usersStore from "../../store/Users/users-store";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Users = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [type, setType] = useState("");
  const [id, setId] = useState<null | number>(null);
  const { users, count } = usersStore((state: any) => state);
  const { getUsers, setCount }: any = usersStore();

  const handleEditClick = (id: number): any => {
    setId(id);
    setType("Edit");
    setOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    UserApi.deleteUser(id);
    setCount(count - 1);
  };

  useEffect(() => {
    getUsers(page, 5);
  }, [open]);

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    try {
      getUsers(newPage, rowsPerPage);
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
      getUsers(page, parseInt(event.target.value, 10));
    } catch (error) {
      console.log(error);
    }
  };

  const columns: GridColDef<(typeof users)[number]>[] = [
    { field: "first_name", headerName: "First name", width: 200 },
    { field: "last_name", headerName: "Last name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone_number", headerName: "Phone number", width: 200 },
    { field: "user_role", headerName: "User role", width: 200 },
    { field: "team_name", headerName: "Team name", width: 200 },
    {
      field: "user_status",
      headerName: "User status",
      width: 150,
      renderCell: (params: any) => {
        const { row } = params;
        console.log(row)
        return [
          <Chip
            label={
              row.user_status.charAt(0).toUpperCase() + row.user_status.slice(1)
            }
            color={row.user_status ? "success" : "error"}
            variant="outlined"
          />,
        ];
      },
    },
    {
      field: "actions",
      type: "actions",
      width: 150,
      editable: false,
      renderHeader: (params: any) => <strong>{"Actions "}</strong>,
      filterable: false,
      getActions: (params: any) => {
        const { id, row } = params;
        if (id) {
          return [
            <GridActionsCellItem
              icon={<ManageAccountsIcon />}
              label="Previw"
              key={id}
              sx={{
                color: "black",
              }}
              className="textPrimary"
              onClick={() => handleEditClick(id)}
              // color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteForeverIcon />}
              label="Previw"
              key={id}
              sx={{
                color: "red",
              }}
              className="textPrimary"
              onClick={() => handleDeleteClick(id)}
              // color="inherit"
            />,
          ];
        }
        return [];
      },
    },
  ];

  return (
    <Box className={`${className} test`}>
      <Card sx={{ marginTop: "15px" }}>
        <CardContent>
          <Button
            className="issac-user-button"
            variant="outlined"
            onClick={() => addNewUser()}
            startIcon={<AddIcon />}
            size="small"
          >
            Add user
          </Button>

          {/* <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 700, background: "white" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>First name</StyledTableCell>
                  <StyledTableCell>Last name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone number</StyledTableCell>
                  <StyledTableCell>Role</StyledTableCell>
                  <StyledTableCell>Lead</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.length > 0 ? (
                  users.map((row: any) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.first_name}
                      </StyledTableCell>
                      <StyledTableCell>{row.last_name}</StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell>{row.phone_number}</StyledTableCell>
                      <StyledTableCell>{row.user_role}</StyledTableCell>
                      <StyledTableCell>{row.team_name}</StyledTableCell>
                      <StyledTableCell>
                        <Chip
                          label={
                            row.user_status.charAt(0).toUpperCase() +
                            row.user_status.slice(1)
                          }
                          color={row.user_status ? "success" : "error"}
                          variant="outlined"
                        />
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
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}

          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </CardContent>
      </Card>
      {open && <UserModal open={open} setOpen={setOpen} type={type} id={id} />}
    </Box>
  );
};

export default styled(Users)`
  ${UsersStyle}
`;
