import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import usersStore from "../../store/Users/users-store";

import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import {
  UserModalSchema,
  initialValues,
  validationUserSchema,
} from "../../forms/userModalSchema";
import { UserForm } from "../../common/Modal/User/UserForm";
import { filterBtnStyle, submitBtnStyle } from "../../common/constants";
import teamsStore from "../../store/Teams/teams-store";
import { ConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { SearchInput } from "../../common/Input/SearchInput";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { addBtnStyle, customUsersValidation } from "../../common/utils";
import { CustomDataGrid } from "../../common/CustomDataGrid/custom-data-grid";
import { PageContainer } from "../../common/PageContainer/page-container";
import FilterListIcon from "@mui/icons-material/FilterList";
import Filters from "../../components/Filters/filters";
import { FilterUsers } from "../../common/forms-filters/FilterUsers";

export const Users = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<null | number>(null);
  const {
    getUsers,
    setCount,
    users,
    counter_users,
    getUserById,
    deleteUser,
    isLoading,
    setSearchValue,
    setPage,
    setSizePerPage,
    addUser,
    editUser,
    resetFilters,
  }: any = usersStore();
  const { getAllTeams, teamsOptions }: any = teamsStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const [initialFormValues, setInitialFormValues] = useState<UserModalSchema>({
    ...initialValues,
  });

  const modalTitle = id ? "Edit User" : "Add New User";
  const submitBtnName = id ? "Update" : "Add User";

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

  const handleChangeRowsPerPage = (model: any) => {
    setSizePerPage(model.pageSize);
    getUsers();
  };

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

  const handleFiltersClose = () => {
    setIsFilterOpen(false);
  };

  const handleFilter = async () => {
    await getUsers();
    setIsFilterOpen(false);
  };

  const resetFilter = () => {
    resetFilters();
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
    <PageContainer>
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
              onChange={(event: any) => handleSearchInputChange(event)}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  getUsers();
                }
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                onClick={() => setIsFilterOpen(true)}
                startIcon={<FilterListIcon />}
                size="small"
                sx={filterBtnStyle}
              >
                Filters
              </Button>

              <Button
                variant="outlined"
                onClick={() => addNewUser()}
                startIcon={<AddIcon />}
                size="small"
                sx={addBtnStyle}
              >
                Add user
              </Button>
            </Box>
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
            validationSchema={customUsersValidation}
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
        <ConfirmationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          message=" Are you sure you want to delete this user? This action cannot be undone."
          btnName="Delete"
        />
      )}

      {isFilterOpen && (
        <Filters
          open={isFilterOpen}
          onClose={handleFiltersClose}
          handleFilter={handleFilter}
          resetFilter={resetFilter}
        >
          <FilterUsers />
        </Filters>
      )}
    </PageContainer>
  );
};
