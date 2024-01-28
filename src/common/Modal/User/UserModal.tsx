import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Input from "../../Input/Input";
import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import { INPUTS } from "../../constants";
import { GenericAddEditForm } from "../../forms-generic-ad-edit/GenericAdEditForm";
import { useState } from "react";
import styled from "styled-components";
import {
  LoginSchema,
  initialValues,
  validationSchema,
} from "../../../forms/loginSchema";
import { ButtonType, ButtonTypes } from "../../Button/models";
import { UserModalStyle } from "./UserModalStyle";
import { Button, Grid, Icon, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { red } from "@mui/material/colors";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserModal = ({ className, open, setOpen }: any) => {
  const [initialFormValues, setInitialFormValues] = useState<LoginSchema>({
    ...initialValues,
  });
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitModal = () => {
    console.log("here");
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
              sx={{ width: "97%" }}
            >
              Add new user
            </Typography>
            <CloseIcon
              sx={{ cursor: "pointer", float: "right" }}
              onClick={() => handleClose()}
            />
          </Grid>
          <hr />
          <GenericAddEditForm
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            apiRequest={handleSubmitModal}
            form={(formProps: any) => (
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        INPUTS.FIRST_NAME.NAME
                      )}
                      label="First name"
                      style={{ display: "flex" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        INPUTS.LAST_NAME.NAME
                      )}
                      label="Last name"
                      style={{ display: "flex" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        INPUTS.EMAIL.NAME
                      )}
                      label="Email"
                      style={{ display: "flex" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        INPUTS.TEAM.NAME
                      )}
                      label="Team"
                      style={{ display: "flex" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        INPUTS.PASSWORD.NAME
                      )}
                      label="Password"
                      style={{ display: "flex" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        INPUTS.PHONE.NAME
                      )}
                      label="Phone number"
                      style={{ display: "flex" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Input
                      {...generateFormikInputFieldProps(
                        formProps,
                        INPUTS.ROLE.NAME
                      )}
                      label="Role"
                      style={{ display: "flex" }}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Button
                  className="issac-user-button"
                  variant="outlined"
                  sx={{
                    float: "right",
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
                  type="submit"
                >
                  Save
                </Button>

                <Typography sx={{ color: "red" }}>
                  This part is on progress!
                </Typography>
              </div>
            )}
          />
        </Box>
      </Modal>
    </div>
  );
};
export default styled(UserModal)`
  ${UserModalStyle}
`;
