import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Card, CardContent, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { UsersStyle } from "./UsersStyle";
import styled from "styled-components";
import { styled as styledMaterial } from "@mui/material";
import usersStore from "../../store/Users/users-store";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import {
  UserModalSchema,
  initialValues,
  validationUserSchema,
} from "../../forms/userModalSchema";
import { UserForm } from "../../common/Modal/User/UserForm";
import { addBtnStyle, submitBtnStyle } from "../../common/constants";
import teamsStore from "../../store/Teams/teams-store";
import { DeleteConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { SearchInput } from "../../common/Input/SearchInput";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";

const CustomDataGrid: any = styledMaterial(DataGrid)(
  ({ theme, styleColumns }: any) => ({
    "& .row-green": {
      backgroundColor: "#dff0d8 !important",
    },
    "& .row-red": {
      backgroundColor: "#f2dede !important",
    },
    "& .bold": {
      fontWeight: "bold",
    },
    "& .MuiDataGrid-columnHeaders": {
      position: "relative",
    },
    "& .MuiDataGrid-cell": {
      position: "relative",
    },
    // Actions
    "& .pinned-column": {
      position: "sticky",
      right: 0,
      backgroundColor: "#fff",
      zIndex: 2,
    },
    "& .MuiDataGrid-columnHeader--pinned": {
      position: "sticky!important",
      right: 0,
      backgroundColor: "#fff",
      zIndex: 100,
    },

    "& .MuiDataGrid-row": {
      display: "flex",
    },
    "& .MuiDataGrid-scrollbar--horizontal": {
      display: "grid",
    },
  })
);

const Users = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const [id, setId] = useState<null | number>(null);
  const {
    getUsers,
    setCount,
    users,
    counter_users,
    getUserById,
    user,
    deleteUser,
    isLoading,
    setSearchValue,
    modelPage,
    setPage,
    setSizePerPage,
    addUser,
    editUser,
  }: any = usersStore();
  const { getAllTeams, teamsOptions }: any = teamsStore();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const [initialFormValues, setInitialFormValues] = useState<UserModalSchema>({
    ...initialValues,
  });
  // const [paginationModel, setPaginationModel] = useState({
  //   page: 0,
  //   pageSize: 5,
  // });

  const modalTitle = id ? "Edit" : "Add New User";
  const submitBtnName = id ? "Update" : "Add User";

  const token: any = localStorage.getItem("authToken");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (id: number) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteUser(id);
    setCount(counter_users - 1);
    getUsers();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = useCallback(
    async (id: number) => {
      // Fetch user data by ID
      await getUserById(id);

      // Safely extract user details from the store
      const user = usersStore.getState().user;
      if (!user) {
        return;
      }

      const { created_date, team_name, id: userId, ...rest } = user;

      // Set state for editing
      setId(id);
      setOpen(true);
      setInitialFormValues(rest);
    },
    [getUserById]
  );

  useEffect(() => {
    setSecontToolbarMessage("USERS");
    setSecontToolbarPath("List");
    getAllTeams();
    getUsers();

    return () => {
      resetSecondToolbar();
    };
  }, []);

  const handleChangePage = (model: any) => {
    setPage(model.page + 1);
    getUsers();
  };

  const addNewUser = () => {
    setOpen(true);
    setId(null);
  };

  const handleChangeRowsPerPage = async (model: any) => {
    setSizePerPage(model.pageSize);
    // setRowsPerPage(parseInt(model.page, model.pageSize));
    getUsers();
  };

  // const handlePageChange: any = async (model: any) => {
  //   setPaginationModel((prev) => ({
  //     ...prev,
  //     page: model.page,
  //   }));
  //   getUsers(model.page, model.pageSize);
  // };

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event?.target.value);
    if (!event?.target.value) {
      getUsers();
    }
  };

  const handleSubmitModal = async (values: any) => {
    if (id) {
      // edit user
      await editUser(id, values);
    } else {
      // add new user
      await addUser(values);
    }
    setOpen(false);
    await getUsers();
    setInitialFormValues(initialValues);
  };

  const columns: GridColDef<(typeof users)[number]>[] = [
    { field: "first_name", headerName: "First name", width: 250 },
    { field: "last_name", headerName: "Last name", width: 250 },
    { field: "email", headerName: "Email", width: 350 },
    { field: "phone_number", headerName: "Phone number", width: 300 },
    { field: "user_role", headerName: "User role", width: 250 },
    { field: "team_name", headerName: "Team name", width: 300 },
    {
      field: "user_status",
      headerName: "User status",
      width: 250,
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
      cellClassName: "pinned-column",
      headerClassName: "MuiDataGrid-columnHeader--pinned",
      getActions: (params: any) => {
        const { id } = params;
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 1,
            }}
          >
            <SearchInput
              onChange={(event: any) => handleSearchInputChange(event)}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  event.preventDefault(); // Prevent form submission if inside a form
                  getUsers();
                }
              }}
            />

            <Button
              variant="outlined"
              onClick={() => addNewUser()}
              startIcon={<AddIcon />}
              size="small"
              // sx={addBtnStyle}
              sx={{
                bgcolor: "#2bb89b",
                color: "#fff",
                border: 'none',
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#2bb89b",
                },
              }}
            >
              Add user
            </Button>
          </Box>

          <CustomDataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            rowCount={counter_users}
            // pageSize={modelPage.sizePage}
            pageSizeOptions={[5, 10, 25, 50]}
            onPaginationModelChange={(model: any) => {
              handleChangePage(model);
              handleChangeRowsPerPage(model);
            }}
            disableRowSelectionOnClick
            disableVirtualization
            paginationMode="server"
            pagination
            loading={isLoading}
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
            validationSchema={validationUserSchema}
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

      {isModalOpen && (
        <DeleteConfirmationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          itemName="this user"
        />
      )}
    </Box>
  );
};

export default styled(Users)`
  ${UsersStyle}
`;
