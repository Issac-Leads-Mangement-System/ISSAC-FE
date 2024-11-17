import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteForeverIcon,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";

import { TeamStyle } from "./TeamStyle";
import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import { TeamForm } from "../../common/Modal/Teams/TeamForm";
import { addBtnStyle, submitBtnStyle } from "../../common/constants";
import {
  TeamModalSchema,
  initialValues,
  validationTeamSchema,
} from "../../forms/teamModalSchema";
import teamsStore from "../../store/Teams/teams-store";
import { DeleteConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { SearchInput } from "../../common/Input/SearchInput";

const Team = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [countUsers, setCountUsers] = useState(0);
  const [id, setId] = useState<null | number>(null);
  const [initialFormValues, setInitialFormValues] = useState<TeamModalSchema>({
    ...initialValues,
  });
  const {
    getTeams,
    teams,
    getTeam,
    team,
    deleteTeam,
    isLoading,
    setSearchValue,
    addTeam,
    editTeam,
    setPage,
    setSizePerPage,
    count,
  }: any = teamsStore();
  const modalTitle = id ? "Edit team" : "Add New Team";
  const submitBtnName = id ? "Update" : "Add Team";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (id: number) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteTeam(id);
    setUserList(userList.filter((user: any) => user.id !== id));
    setCountUsers(countUsers - 1);
    await getTeams();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = useCallback(
    async (id: number) => {
      await getTeam(id);

      // Now safely access the updated team data
      const updatedTeam = teamsStore.getState().team;
      setId(id);
      setOpen(true);
      setInitialFormValues(updatedTeam);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [team]
  );

  useEffect(() => {
    getTeams();
  }, []);

  const handleChangePage = (model: any) => {
    setPage(model.page + 1);
    getTeams();
  };

  const handleChangeRowsPerPage = (model: any) => {
    setSizePerPage(model.pageSize);
    getTeams();
  };

  const addNewTeam = () => {
    setOpen(true);
    setId(null);
  };

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event?.target.value);
    if (!event?.target.value) {
      getTeams(0, 10);
    }
  };

  const handleSubmitModal = async (values: any) => {
    if (id) {
      await editTeam(id, values);
    } else {
      await addTeam(values);
    }

    await getTeams();

    setOpen(false);
    setInitialFormValues(initialValues);
  };

  const columns: GridColDef<(typeof teams)[number]>[] = [
    { field: "team_name", headerName: "Team name", width: 200 },
    { field: "created_date", headerName: "Created date", width: 200 },
    {
      field: "actions",
      type: "actions",
      width: 150,
      editable: false,
      renderHeader: (params: any) => <strong>{"Actions"}</strong>,
      filterable: false,
      getActions: (params: any) => {
        const { id, row } = params;
        if (id) {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Previw"
              key={id}
              sx={{
                color: "black",
              }}
              className="textPrimary"
              onClick={() => handleEditClick(id)}
            />,
            <GridActionsCellItem
              icon={<GridDeleteForeverIcon />}
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
    <div className={`${className} test`}>
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
              onChange={(event: any) => {
                handleSearchInputChange(event);
              }}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  getTeams(0, 10);
                }
              }}
            />

            <Button
              className="issac-user-button"
              variant="outlined"
              onClick={() => addNewTeam()}
              startIcon={<AddIcon />}
              size="small"
              sx={addBtnStyle}
            >
              Add team
            </Button>
          </Box>

          <DataGrid
            rows={teams}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            onPaginationModelChange={(model: any) => {
              handleChangeRowsPerPage(model);
              handleChangePage(model);
            }}
            rowCount={count}
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
            validationSchema={validationTeamSchema}
            apiRequest={handleSubmitModal}
            hasSubmitButton={true}
            submitBtnName={submitBtnName}
            form={(formProps: any) => <TeamForm formProps={formProps} />}
            btnStyle={submitBtnStyle}
          />
        </CustomModal>
      )}

      {isModalOpen && (
        <DeleteConfirmationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          itemName="this team"
        />
      )}
    </div>
  );
};

export default styled(Team)`
  ${TeamStyle}
`;
