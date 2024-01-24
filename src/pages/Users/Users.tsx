import React, { useState } from "react";
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
import UserModal from "../../common/Modal/User/UserModal";
import Paper from "@mui/material/Paper";
import { UsersStyle } from "./UsersStyle";
import styled from "styled-components";
import { StyledTableCell, StyledTableRow } from "../../common/utils";
import AddIcon from "@mui/icons-material/Add";

const Users = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleEditClick = (id: number): any => {
    console.log("edit id", id);
    setOpen(true);
  };

  const handleDeleteClick = (id: number): any => {
    console.log("delete id", id);
    setOpen(false);
    // return;
  };

  function createData(
    first_name: string,
    last_name: string,
    email: string,
    role: string,
    lead: string
  ) {
    return { first_name, last_name, email, role, lead };
  }

  const rows: any = [
    createData("Barak", "Maoz", "barakm@gmail.com", "Admin", "-"),
    createData(
      "Marcel",
      "Poroch",
      "porochmarcel@gmail.com",
      "Employee",
      "Barak Maoz"
    ),
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const addNewUser = () => {
    setOpen(true);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={`${className} test`}>
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
            {rows && rows.length > 0 ? (
              rows.map((row: any) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.first_name}
                  </StyledTableCell>
                  <StyledTableCell>{row.last_name}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.role}</StyledTableCell>
                  <StyledTableCell>{row.lead}</StyledTableCell>
                  <StyledTableCell align="right">
                    <EditIcon
                      color="disabled"
                      onClick={() => handleEditClick}
                    />
                    <DeleteIcon color="disabled" />
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {open && <UserModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default styled(Users)`
  ${UsersStyle}
`;
