import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import styled from "styled-components";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import { submitBtnStyle } from "../../common/constants";
import { DeleteConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { LeadsStyle } from "./LeadsStyle";
import leadsTypesStore from "../../store/Leads/types-store";
import { SearchInput } from "../../common/Input/SearchInput";
import { TypesFormForm } from "../../common/Modal/LeadsTypes/TypesForm";
import {
  ILeadsTypesModalSchema,
  initialValues,
  validationLeadsTypesSchema,
} from "../../forms/leadsTypeModalSchema";
import { addBtnStyle } from "../../common/utils";
import { CustomDataGrid } from "../../common/CustomDataGrid/custom-data-grid";
import { PageContainer } from "../../common/PageContainer/page-container";

const LeadsTypes = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [id, setId] = useState<null | number>(null);
  const {
    getTypes,
    setSearchValue,
    types,
    isLoading,
    saveTypes,
    deleteType,
    type,
    getLeadsTypeById,
    updateType,
  }: any = leadsTypesStore();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const [initialFormValues, setInitialFormValues] =
    useState<ILeadsTypesModalSchema>({
      ...initialValues,
    });

  const modalTitle = id ? "Edit Type" : "Add New Type";
  const submitBtnName = id ? "Update" : "Add Type";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (id: number) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteType(id);
    await getTypes(page, 5);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addNewType = () => {
    setOpen(true);
    setId(null);
  };

  const handleEditClick = useCallback(
    async (id: number) => {
      try {
        await getLeadsTypeById(id);
        await new Promise((resolve) => setTimeout(resolve, 0));

        setId(id);
        setOpen(true);
        const { type } = leadsTypesStore.getState();
        setInitialFormValues(type);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    [type]
  );

  useEffect(() => {
    setSecontToolbarMessage("LEADS");
    setSecontToolbarPath("Types");
    getTypes(page, 5);

    return () => {
      resetSecondToolbar();
    };
  }, []);

  const handleSubmitModal = async (values: any) => {
    if (id) {
      updateType(values);
    } else {
      await saveTypes(values);
    }
    await getTypes(0, 10);
    setOpen(false);
  };

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event?.target.value);
    if (!event?.target.value) {
      getTypes(0, 10);
    }
  };

  const columns: GridColDef<(typeof types)[number]>[] = [
    { field: "type_name", headerName: "Type name", width: 250 },
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
                  getTypes(0, 10);
                }
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                onClick={() => addNewType()}
                startIcon={<AddIcon />}
                size="small"
                sx={addBtnStyle}
              >
                Add type
              </Button>
            </Box>
          </Box>

          <CustomDataGrid
            rows={types}
            columns={columns}
            loading={isLoading}
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
          }}
          title={modalTitle}
        >
          <GenericAddEditForm
            initialValues={initialFormValues}
            validationSchema={validationLeadsTypesSchema}
            apiRequest={handleSubmitModal}
            hasSubmitButton={true}
            submitBtnName={submitBtnName}
            form={(formProps: any) => <TypesFormForm formProps={formProps} />}
            btnStyle={submitBtnStyle}
          />
        </CustomModal>
      )}

      {isModalOpen && (
        <DeleteConfirmationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          itemName="this type"
        />
      )}
    </PageContainer>
  );
};

export default styled(LeadsTypes)`
  ${LeadsStyle}
`;
