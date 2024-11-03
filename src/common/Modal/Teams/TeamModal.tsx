import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Input from "../../Input/Input";
import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import { INPUTS, ROLE } from "../../constants";
import { GenericAddEditForm } from "../../forms-generic-ad-edit/GenericAdEditForm";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  UserModalSchema,
  initialValues,
  validationTeamSchema,
} from "../../../forms/userModalSchema";
import { TeamModalStyle } from "./TeamModalStyle";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TeamModal = ({ className, open, setOpen, type, id }: any) => {
  const [initialFormValues, setInitialFormValues] = useState<UserModalSchema>({
    ...initialValues,
  });
  const [userTeamList, setUserTeamList] = useState([]);
  const token: any = localStorage.getItem("authToken");

  const handleClose = () => {
    setOpen(false);
  };

  const getUserTeam = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/teams/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserTeamList(result.data.teams_response);
  };

  const getUserById = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users/teams/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setInitialFormValues(result.data);
  };
  useEffect(() => {
    getUserTeam();
    if (id) {
      getUserById();
    }
  }, []);

  const handleSubmitModal = (values: any) => {
    if (id) {
      axios.put(
        `${process.env.REACT_APP_BASE_URL}/users/edit_team/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      axios.post(`${process.env.REACT_APP_BASE_URL}/users/add_team`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`${className} modal`}
      >
        <Box sx={style}>
          <Grid container={true}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ width: "95%" }}
            >
              {type} team
            </Typography>
            <CloseIcon
              sx={{ cursor: "pointer", float: "right" }}
              onClick={() => handleClose()}
            />
          </Grid>
          <hr />
          <GenericAddEditForm
            initialValues={initialFormValues}
            validationSchema={validationTeamSchema}
            apiRequest={handleSubmitModal}
            hasSubmitButton={true}
            submitBtnName={"Save"}
            form={(formProps: any) => (
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        INPUTS.TEAM.NAME
                      )}
                      label="Team name"
                      style={{ display: "flex" }}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Button
                  className="issac-user-button"
                  variant="outlined"
                  onClick={() => handleClose()}
                  sx={{
                    float: "left",
                    color: "white",
                    border: 0,
                    marginBottom: "5px",
                    backgroundColor: "#000000d4",
                    marginTop: "10px",
                    "&:hover": {
                      backgroundColor: "#000000d4",
                    },
                  }}
                  size="small"
                  type="button"
                >
                  Close
                </Button>
              </div>
            )}
          />
        </Box>
      </Modal>
    </div>
  );
};
export default styled(TeamModal)`
  ${TeamModalStyle}
`;
