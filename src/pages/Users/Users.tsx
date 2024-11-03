import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
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
import AddIcon from "@mui/icons-material/Add";
import UserApi from "../../api/users";
import UserModal from "../../common/Modal/User/UserModal";
import usersStore from "../../store/Users/users-store";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import {
  UserModalSchema,
  validationTeamSchema,
  initialValues,
} from "../../forms/userModalSchema";
import { UserForm } from "../../common/Modal/User/UserForm";
import { addBtnStyle, submitBtnStyle } from "../../common/constants";
import teamsStore from "../../store/Teams/teams-store";

const Users = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [id, setId] = useState<null | number>(null);
  const { getUsers, setCount, users, count, getUserById, user }: any =
    usersStore();
  const { getAllTeams, teamsOptions }: any = teamsStore();
  const [initialFormValues, setInitialFormValues] = useState<UserModalSchema>({
    ...initialValues,
  });

  const modalTitle = id ? "Edit" : "Add New User";
  const submitBtnName = id ? "Update" : "Add User";

  const token: any = localStorage.getItem("authToken");
  // const userTeamList = [
  //   {
  //     id: 1,
  //     team_name: "team_issac",
  //     created_date: "2024-10-02",
  //   },
  //   {
  //     id: 2,
  //     team_name: "team_barak",
  //     created_date: "2024-10-02",
  //   },
  // ];

  // const handleEditClick = (id: number): any => {
  //   setId(id);
  //   setOpen(true);
  //   // setInitialFormValues({});
  // };
  const handleEditClick = useCallback(
    async (id: number) => {
      try {
        await getUserById(id);

        // Wait for the team data to be updated in the store
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Now safely access the updated team data
        const {
          created_date,
          team_name,
          id: userId,
          ...rest
        } = usersStore.getState().user;
        setId(id);
        setOpen(true);
        setInitialFormValues(rest);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error appropriately (e.g., show error message)
      }
    },
    [user]
  );

  const handleDeleteClick = async (id: number) => {
    await UserApi.deleteUser(id);
    setCount(count - 1);
    await getUsers(page, 5);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  useEffect(() => {
    getUsers(page, 5);
  }, []);

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    try {
      getUsers(newPage, rowsPerPage);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewUser = () => {
    setOpen(true);
    setId(null);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setRowsPerPage(parseInt(event.target.value, 10));
      getUsers(page, parseInt(event.target.value, 10));
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitModal = async (values: any) => {
    if (id) {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/users/edit_user/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/add_user`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    setOpen(false);
    await getUsers(page, 5);
    setInitialFormValues(initialValues);
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
        return [
          <Chip
            key={crypto.randomUUID()}
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
            variant="outlined"
            onClick={() => addNewUser()}
            startIcon={<AddIcon />}
            size="small"
            sx={addBtnStyle}
          >
            Add user
          </Button>

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
            disableRowSelectionOnClick
          />
        </CardContent>
      </Card>

      {open && (
        <CustomModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setInitialFormValues(initialValues);
          }}
          title={modalTitle}
        >
          <GenericAddEditForm
            initialValues={initialFormValues}
            validationSchema={validationTeamSchema}
            apiRequest={handleSubmitModal}
            hasSubmitButton={true}
            submitBtnName={submitBtnName}
            form={(formProps: any) => (
              <UserForm formProps={formProps} userTeamList={teamsOptions} />
            )}
            btnStyle={submitBtnStyle}
          />
        </CustomModal>
      )}
    </Box>
  );
};

export default styled(Users)`
  ${UsersStyle}
`;
