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
import { addBtnStyle, filterBtnStyle, submitBtnStyle } from "../../common/constants";
import teamsStore from "../../store/Teams/teams-store";
import { Loader } from "../../common/Loader/Loader";
import { DeleteConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { SearchInput } from "../../common/Input/SearchInput";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { LeadsStyle } from "./LeadsStyle";
import leadsStore from "../../store/Leads/leads-store";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { LeadsForm } from "../../common/Modal/Leads/LeadsForm";
import leadsTypesStore from "../../store/Leads/types-store";
import leadsStatusesStore from "../../store/Leads/statuses-store";
import FilterListIcon from "@mui/icons-material/FilterList";
import Filters from "../../components/Filters/filters";
import { FilterLeads } from "../../common/forms-filters/FilterLeads";

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
      "&:active": {},
    },
  },
}));

const Leads = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<null | number>(null);
  const {
    leads,
    lead,
    getLeads,
    setSearchValue,
    getLeadById,
    saveLeads,
    updateLeads,
    count,
    setRowsPerPage,
    pagination,
    setPage,
    deleteLeads,
    resetFilters,
  }: any = leadsStore();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const { getTypes }: any = leadsTypesStore();
  const {
    getStatus,
  }: any = leadsStatusesStore();
  const [initialFormValues, setInitialFormValues] = useState<ILeadsModalSchema>(
    {
      ...initialValues,
    }
  );

  const modalTitle = id ? "Edit" : "Add New Lead";
  const submitBtnName = id ? "Update" : "Add Lead";

  const token: any = localStorage.getItem("authToken");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    await deleteLeads(id);
    await getLeads();
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
        lead.type_id = lead.lead_type.lead_type_id;
        lead.lead_status_id = lead.lead_status.lead_status_id;
        setInitialFormValues(lead);
        // Wait for the team data to be updated in the store
        await new Promise((resolve) => setTimeout(resolve, 0));
        setId(id);
        setOpen(true);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    [lead]
  );

  useEffect(() => {
    setSecontToolbarMessage("LEADS");
    setSecontToolbarPath("List");
    getLeads();
    getTypes(0, 50);
    getStatus(0, 50);

    return () => {
      resetSecondToolbar();
    };
  }, []);
  

  const handleChangePage = async (model: any) => {
    setPage(model.page)
    await getLeads();
  };

  const addNewUser = () => {
    setOpen(true);
    setId(null);
  };

  const addLead = (typeAdd: boolean) => {
    setOpen(true);
    setId(null);
    setTypeOfAdd(typeAdd);
  };

  const handleChangeRowsPerPage = async (
    model: any
  ) => {
    try {
      setRowsPerPage(model.pageSize);
      setPage(model.page)
      await getLeads();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitModal = async (values: any) => {
    if (id) {
      updateLeads(values);
    } else {
      saveLeads(values, typeOfAdd);
    }
    await getLeads();
    setOpen(false);
  };

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event?.target.value);
    if (!event?.target.value) {
      getLeads();
    }
  };

  const handleFiltersClose = () => {
    setIsFilterOpen(false);
  };

  const handleFilter = async () => {
    await getLeads();
    setIsFilterOpen(false);
    // await getStatus(1, 10);
  };

  const resetFilter = () => {
    resetFilters();
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
              disabled
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
                  getLeads(0, 10);
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
                size="small"
                id="demo-customized-button"
                aria-controls={openOption ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openOption ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  bgcolor: "#2bb89b",
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#2bb89b",
                  },
                }}
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
                  <PersonAddAltIcon /> Add one lead
                </MenuItem>
                <MenuItem onClick={() => addLead(true)} disableRipple>
                  <UploadFileIcon /> Upload file
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>

          {leads?.length > 0 && (
            <CustomDataGrid
              rows={leads}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              onPaginationModelChange={(model: any) => {
                if (model.pageSize !== pagination.pageSize) {
                  handleChangeRowsPerPage(model);
                }
                if (model.page !== pagination.page) {
                  handleChangePage(model);
                }
              }}
              rowCount={count}
              pageSizeOptions={[5, 10, 25, 50]}
              disableRowSelectionOnClick
              disableVirtualization
              paginationMode="server"
            />
          )}
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
              <LeadsForm formProps={formProps} typeOfAdd={typeOfAdd} id={id} />
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
          itemName="this lead"
        />
      )}

      {isFilterOpen && (
        <Filters
          open={isFilterOpen}
          onClose={handleFiltersClose}
          handleFilter={handleFilter}
          resetFilter={resetFilter}
        >
          <FilterLeads />
        </Filters>
      )}
    </Box>
  );
};

export default styled(Leads)`
  ${LeadsStyle}
`;
