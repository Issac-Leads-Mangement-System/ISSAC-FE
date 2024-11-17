import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import styled from "styled-components";
import { styled as styledMaterial } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import {
  addBtnStyle,
  filterBtnStyle,
  submitBtnStyle,
} from "../../common/constants";
import teamsStore from "../../store/Teams/teams-store";
import { DeleteConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { LeadsStyle } from "./LeadsStyle";
import leadsTypesStore from "../../store/Leads/types-store";
import {
  initialValues,
  ILeadsStatusModal,
  validationLeadsStatusSchema,
} from "../../forms/leadsStatusModalSchema";
import { LeadsStatusForm } from "../../common/Modal/LeadsStatus/LeadsStatusForm";
import Filters from "../../components/Filters/filters";
import leadsStatusesStore from "../../store/Leads/statuses-store";
import { FilterLeadsStatuses } from "../../common/forms-filters/FilterLeadsStatuses";
import { SearchInput } from "../../common/Input/SearchInput";
import FilterListIcon from "@mui/icons-material/FilterList";

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
// create a seprate component for CustomDataGrid

const LeadsStatus = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [id, setId] = useState<null | number>(null);
  const {
    getStatus,
    addStatus,
    resetStore,
    deleteStatuses,
    getLeadStatusesById,
    status,
    updateStatus,
    statuses,
    isLoading,
    resetFilters,
    setSearchValue,
  }: any = leadsStatusesStore();
  const { getAllTeams, teamsOptions }: any = teamsStore();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const [initialFormValues, setInitialFormValues] = useState<ILeadsStatusModal>(
    {
      ...initialValues,
    }
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const modalTitle = id ? "Edit" : "Add New Status";
  const submitBtnName = id ? "Update" : "Add Status";

  const token: any = localStorage.getItem("authToken");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = async (id: number) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteStatuses(id);
    await getStatus(1, 10);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setSecontToolbarMessage("LEADS");
    setSecontToolbarPath(" / Statuses");
    getStatus(page, 5);

    return () => {
      resetSecondToolbar();
      resetStore();
    };
  }, []);

  const handleSubmitModal = async (values: any) => {
    if (!id) {
      addStatus(values);
    } else {
      await updateStatus(values);
      await getStatus(page, 10);
    }
    setOpen(false);
  };

  const handleEditClick = useCallback(
    async (id: number) => {
      try {
        await getLeadStatusesById(id);
        await new Promise((resolve) => setTimeout(resolve, 0));

        setId(id);
        setOpen(true);
        const { status } = leadsStatusesStore.getState();
        setInitialFormValues(status);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    [status]
  );

  const addLeadsStatus = () => {
    setOpen(true);
    setId(null);
  };

  const handleFiltersClose = () => {
    setIsFilterOpen(false);
  };

  const handleFilter = async () => {
    setIsFilterOpen(false);
    await getStatus(1, 10);
  };

  const resetFilter = () => {
    resetFilters();
  };

  const columns: GridColDef<(typeof statuses)[number]>[] = [
    { field: "status_name", headerName: "Status name", width: 250 },
    { field: "created_date", headerName: "Created date", width: 250 },

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

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event?.target.value);
    if (!event?.target.value) {
      getStatus(0, 10);
    }
  };

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
                  getStatus(0, 10);
                }
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <Button
                variant="outlined"
                onClick={() => setIsFilterOpen(true)}
                startIcon={<FilterListIcon />}
                size="small"
                sx={filterBtnStyle}
              >
                Filters
              </Button> */}

              <Button
                variant="outlined"
                onClick={() => addLeadsStatus()}
                startIcon={<AddIcon />}
                size="small"
                sx={addBtnStyle}
              >
                Add status
              </Button>
            </Box>
          </Box>

          <CustomDataGrid
            rows={statuses}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            disableRowSelectionOnClick
            disableVirtualization
            loading={isLoading}
          />
        </CardContent>
      </Card>

      {open && (
        <CustomModal
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
          title={modalTitle}
        >
          <GenericAddEditForm
            initialValues={initialFormValues}
            validationSchema={validationLeadsStatusSchema}
            apiRequest={handleSubmitModal}
            hasSubmitButton={true}
            submitBtnName={submitBtnName}
            form={(formProps: any) => <LeadsStatusForm formProps={formProps} />}
            btnStyle={submitBtnStyle}
          />
        </CustomModal>
      )}

      {isModalOpen && (
        <DeleteConfirmationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          itemName="this status"
        />
      )}

      {isFilterOpen && (
        <Filters
          open={isFilterOpen}
          onClose={handleFiltersClose}
          handleFilter={handleFilter}
          resetFilter={resetFilter}
        >
          <FilterLeadsStatuses />
        </Filters>
      )}
    </Box>
  );
};

export default styled(LeadsStatus)`
  ${LeadsStyle}
`;
