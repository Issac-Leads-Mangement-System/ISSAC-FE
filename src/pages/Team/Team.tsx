import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardContent } from "@mui/material";
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
import { Loader } from "../../common/Loader/Loader";
import { DeleteConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { SearchInput } from "../../common/Input/SearchInput";

const Team = ({ className }: any) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);
  const [countUsers, setCountUsers] = useState(0);
  const [id, setId] = useState<null | number>(null);
  const [initialFormValues, setInitialFormValues] = useState<TeamModalSchema>({
    ...initialValues,
  });
  const token: any = localStorage.getItem("authToken");
  const { getTeams, teams, getTeam, team, deleteTeam, isLoading }: any =
    teamsStore();
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
    await getTeams(page, 5);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = useCallback(
    async (id: number) => {
      try {
        await getTeam(id);

        // Wait for the team data to be updated in the store
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Now safely access the updated team data
        const updatedTeam = teamsStore.getState().team;
        setId(id);
        setOpen(true);
        setInitialFormValues(updatedTeam);
      } catch (error) {
        console.error("Error fetching team:", error);
        // Handle error appropriately (e.g., show error message)
      }
    },
    [team]
  );

  useEffect(() => {
    getTeams(page, 5);
  }, []);

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/teams/?page=${
          newPage + 1
        }&limit=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.teams_response?.length > 0) {
        setUserList(response.data.teams_response);
      } else if (response?.data?.length > 0) {
        setUserList(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addNewTeam = () => {
    setOpen(true);
    setId(null);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setRowsPerPage(parseInt(event.target.value, 10));
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/teams/?page=${
          page === 0 ? page + 1 : page
        }&limit=${parseInt(event.target.value, 10)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.teams_response?.length > 0) {
        setUserList(response.data.teams_response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitModal = async (values: any) => {
    if (id) {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/users/edit_team/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/add_team`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    await getTeams(page, 5);

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
        {isLoading && <Loader />}
        <CardContent>
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

          <SearchInput />

          <DataGrid
            rows={teams}
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
          itemName="this user"
        />
      )}
    </div>
  );
};

export default styled(Team)`
  ${TeamStyle}
`;
