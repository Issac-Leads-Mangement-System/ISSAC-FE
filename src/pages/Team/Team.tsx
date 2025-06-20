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
import { submitBtnStyle } from "../../common/constants";
import {
  TeamModalSchema,
  initialValues,
  validationTeamSchema,
} from "../../forms/teamModalSchema";
import teamsStore from "../../store/Teams/teams-store";
import { ConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { SearchInput } from "../../common/Input/SearchInput";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { addBtnStyle, customTeam } from "../../common/utils";
import { PageContainer } from "../../common/PageContainer/page-container";

const Team = () => {
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
  const { setSecontToolbarMessage, setSecontToolbarPath }: any =
    secondToolbarStore();
  const modalTitle = id ? "עדכן צוות" : "הוסף צוות חדש";
  const submitBtnName = id ? "עדכן" : "הוסף צוות";
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
    setSecontToolbarMessage("משתמשים");
    setSecontToolbarPath("רשימת צוותים");
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
    { field: "team_name", headerName: "שם צוות",  flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center", },
    { field: "created_date", headerName: "תאריך יצירה",  flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center", },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",
      editable: false,
      headerName: "פעולות",
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
              dir="ltr"
              className="issac-user-button"
              variant="outlined"
              onClick={() => addNewTeam()}
              startIcon={<AddIcon />}
              size="small"
              sx={addBtnStyle}
            >
              הוסף צוות
            </Button>
          </Box>
          <div dir="ltr">
          <DataGrid
            rows={teams}
            columns={columns.reverse()}
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
            style={{
              minHeight: "50vh",
              overflow: "auto",
            }}
          />
          </div>
        </CardContent>
      </Card>

      {open && (
        <CustomModal
          dir="rtl"
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setInitialFormValues(initialValues);
          }}
          title={modalTitle}
          width="400px"
        >
          <GenericAddEditForm
            initialValues={initialFormValues}
            validationSchema={customTeam}
            apiRequest={handleSubmitModal}
            hasSubmitButton={true}
            submitBtnName={submitBtnName}
            form={(formProps: any) => <TeamForm formProps={formProps} />}
            btnStyle={submitBtnStyle}
          />
        </CustomModal>
      )}

      {isModalOpen && (
        <ConfirmationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          message=" Are you sure you want to delete this team? This action cannot be undone."
          btnName="Delete"
        />
      )}
    </PageContainer>
  );
};

export default styled(Team)`
  ${TeamStyle}
`;
