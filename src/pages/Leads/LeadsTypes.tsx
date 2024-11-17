import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
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
  UserModalSchema,
  validationUserSchema,
} from "../../forms/userModalSchema";
import { UserForm } from "../../common/Modal/User/UserForm";
import { addBtnStyle, submitBtnStyle } from "../../common/constants";
import teamsStore from "../../store/Teams/teams-store";
import { DeleteConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { LeadsStyle } from "./LeadsStyle";
import leadsTypesStore from "../../store/Leads/types-store";
import { SearchInput } from "../../common/Input/SearchInput";
import { TypesFormForm } from "../../common/Modal/LeadsTypes/TypesForm";
import { ILeadsTypesModalSchema, initialValues, validationLeadsTypesSchema } from "../../forms/leadsTypeModalSchema";

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

const LeadsTypes = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [id, setId] = useState<null | number>(null);
  const { getTypes, setSearchValue, types, isLoading, saveTypes, deleteType, type, getLeadsTypeById, updateType }: any = leadsTypesStore();
  const { getAllTeams, teamsOptions }: any = teamsStore();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const [initialFormValues, setInitialFormValues] = useState<ILeadsTypesModalSchema>({
    ...initialValues,
  });

  const modalTitle = id ? "Edit" : "Add New Type";
  const submitBtnName = id ? "Update" : "Add Type";

  const token: any = localStorage.getItem("authToken");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (id: number) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    // await deleteUser(id);
    // setCount(count - 1);
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
  }
  
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
    setSecontToolbarPath("/ types");
    // getAllTeams();
    getTypes(page, 5);

    return () => {
      resetSecondToolbar();
    };
  }, []);

  
  const handleSubmitModal = async (values: any) => {
    if(id) { 
      console.log('zzz val', values)
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
            // setInitialFormValues(initialValues);
          }}
          title={modalTitle}
        >
          <GenericAddEditForm
            initialValues={initialFormValues}
            validationSchema={validationLeadsTypesSchema}
            apiRequest={handleSubmitModal}
            hasSubmitButton={true}
            submitBtnName={submitBtnName}
            form={(formProps: any) => (
              <TypesFormForm formProps={formProps} />
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
          itemName="this type"
        />
      )}
    </Box>
  );
};

export default styled(LeadsTypes)`
  ${LeadsStyle}
`;
