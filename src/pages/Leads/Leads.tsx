import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import styled from "styled-components";
import { styled as styledMaterial } from "@mui/material";
import usersStore from "../../store/Users/users-store";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import {
  ILeadsModalSchema,
  initialValues,
  validationLeadsSchema,
} from "../../forms/leadsModalSchema";
import { UserForm } from "../../common/Modal/User/UserForm";
import { addBtnStyle, submitBtnStyle } from "../../common/constants";
import teamsStore from "../../store/Teams/teams-store";
import { Loader } from "../../common/Loader/Loader";
import { DeleteConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { SearchInput } from "../../common/Input/SearchInput";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { LeadsStyle } from "./LeadsStyle";
import leadsStore from "../../store/Leads/leads-store";
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { LeadsForm } from "../../common/Modal/Leads/LeadsForm";

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

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
      },
      "&:active": {
        
      },
    },
  },
}));

const Leads = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [id, setId] = useState<null | number>(null);
  const {
    getUsers,
    setCount,
    users,
    count,
    getUserById,
    user,
    deleteUser,
    isLoading,
  }: any = usersStore();
  const { leads, getLeads, setSearchValue, getLeadById, saveLeads }: any = leadsStore();
  const { getAllTeams, teamsOptions }: any = teamsStore();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const [initialFormValues, setInitialFormValues] = useState<ILeadsModalSchema>({
    ...initialValues,
  });

  const modalTitle = id ? "Edit" : "Add New Lead";
  const submitBtnName = id ? "Update" : "Add Lead";

  const token: any = localStorage.getItem("authToken");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [typeOfAdd, setTypeOfAdd] = useState(false);
  const openOption = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (id: number) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteUser(id);
    setCount(count - 1);
    await getUsers(page, 5);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = useCallback(
    async (id: number) => {
      try {

        await getLeadById(id);
        const { lead } = leadsStore.getState();
        console.log('zzz here', lead)
        setInitialFormValues(lead);
        // Wait for the team data to be updated in the store
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Now safely access the updated team data
        // const {
        //   created_date,
        //   team_name,
        //   id: userId,
        //   ...rest
        // } = usersStore.getState().user;
        setId(id);
        setOpen(true);
        // setInitialFormValues(rest);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error appropriately (e.g., show error message)
      }
    },
    [user]
  );

  useEffect(() => {
    setSecontToolbarMessage("LEADS");
    setSecontToolbarPath("List");
    // getAllTeams();
    // getUsers(page, 5);
    getLeads(page, 10);

    return () => {
      resetSecondToolbar();
    };
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

  const addLead = (typeAdd: boolean) => {
    setOpen(true);
    setTypeOfAdd(typeAdd);
  }

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
    if(id) {

    } else {
      saveLeads(values, typeOfAdd);
      console.log('craete');
    }
    // if (id) {
    //   await axios.put(
    //     `${process.env.REACT_APP_BASE_URL}/users/edit_user/${id}`,
    //     values,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    // } else {
    //   await axios.post(
    //     `${process.env.REACT_APP_BASE_URL}/users/add_user`,
    //     values,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    // }
    // setOpen(false);
    // await getUsers(page, 5);
    // setInitialFormValues(initialValues);
  };

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event?.target.value);
    if (!event?.target.value) {
      getLeads(page, 10);
    }
  };

  const columns: GridColDef<(typeof leads)[number]>[] = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "lead_message", headerName: "Lead message", width: 250 },
    {
      field: "status_name",
      headerName: "Status name",
      width: 250,
      valueGetter: (value: any, row: any) => {
        return `${row.lead_status.status_name}`;
      },
    },
    {
      field: "type_name",
      headerName: "Type name",
      width: 250,
      valueGetter: (value: any, row: any) => {
        return `${row.lead_type.type_name}`;
      },
    },
    { field: "created_date", headerName: "Created date", width: 350 },
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
      <Card>
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
              onChange={(event: any) => {
                handleSearchInputChange(event);
              }}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  getLeads(0, 10);
                }
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                size='small'
                id="demo-customized-button"
                aria-controls={openOption ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openOption ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Add lead
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={openOption}
                onClose={handleClose}
              >
                <MenuItem onClick={() => addLead(false)} disableRipple>
                  <PersonAddAltIcon  /> Add one lead
                </MenuItem>
                <MenuItem onClick={() => addLead(true)} disableRipple>
                  <UploadFileIcon /> Upload file
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>

          <CustomDataGrid
            rows={leads}
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
            disableVirtualization
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
            validationSchema={validationLeadsSchema}
            apiRequest={handleSubmitModal}
            hasSubmitButton={true}
            submitBtnName={submitBtnName}
            form={(formProps: any) => (
              <LeadsForm formProps={formProps} typeOfAdd={typeOfAdd} />
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

export default styled(Leads)`
  ${LeadsStyle}
`;
