import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import styled from "styled-components";

import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import { submitBtnStyle } from "../../common/constants";
import { ConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { LeadsStyle } from "./LeadsStyle";
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
import { addBtnStyle } from "../../common/utils";
import { CustomDataGrid } from "../../common/CustomDataGrid/custom-data-grid";
import { PageContainer } from "../../common/PageContainer/page-container";

const LeadsStatus = () => {
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
  const modalTitle = id ? "Edit Status" : "Add New Status";
  const submitBtnName = id ? "Update" : "Add Status";
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
    setSecontToolbarPath("Statuses");
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
              disabled={!row.status_is_editable}
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
              disabled={!row.status_is_editable}
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
    <PageContainer>
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
                  getStatus(0, 10);
                }
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
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
        <ConfirmationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          message=" Are you sure you want to delete this status? This action cannot be undone."
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
          <FilterLeadsStatuses />
        </Filters>
      )}
    </PageContainer>
  );
};

export default styled(LeadsStatus)`
  ${LeadsStyle}
`;
