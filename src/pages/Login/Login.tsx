import { useEffect, useState } from "react";
import axios from "axios";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "../../theme/Theme";
import { JwtPayload as WtJwtPayload } from "jwt-decode";

import LogoApp from "../../assets/images/loginImage.jpg";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import { generateFormikInputFieldProps } from "../../forms/formikHelper";
import { INPUTS } from "../../common/constants";
import Input from "../../common/Input/Input";
import { ButtonType, ButtonTypes } from "../../common/Button/models";
import {
  LoginSchema,
  initialValues,
  validationSchema,
} from "../../forms/loginSchema";
import Button from "../../common/Button/Button";
import { InputType } from "../../common/Input/models";
import { LoginStyle } from "./LoginStyle";
import Logo from "../../assets/images/transparent-logo.png";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

import useAuthStore from "../../store/authStore/authStore";

interface JwtPayload extends WtJwtPayload {
  id: string;
  sub: string;
  user_role: string;
}

const Login = ({ className, setUser }: any) => {
  const navigate = useNavigate();
  const [initialFormValues, setInitialFormValues] = useState<LoginSchema>({
    ...initialValues,
  });
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let statusLog = localStorage.getItem("authToken");
    if (statusLog) {
      navigate("/users");
    }
  }, []);

  const handleSubmitModal = async (values: any) => {
    const { email, password } = values;
    if (email && password) {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/token`,
          formData
        );
        setIsLoading(false);
        navigate("/users");
        localStorage.setItem("authToken", response?.data?.access_token);
      } catch (error: any) {
        console.error("Login failed", error);
        setApiError(
          error.response && error.response.data
            ? error.response.data.detail
            : "Email or password is incorrect!"
        );
        setIsLoading(false);
      }
    }
  };
  return (
    <ThemeProvider theme={Theme}>
      <div className={` ${className} issac-auth`}>
        <div className="left-side">
          <img className="login-image" src={LogoApp} alt="logo" />
        </div>
        <div className="right-side">
          <div className="issac-auth-container">
            <div className="issac-auth-text-container">
              <img
                className="issac-auth-image-container"
                src={Logo}
                alt="logo"
              />
            </div>
            <GenericAddEditForm
              initialValues={initialFormValues}
              validationSchema={validationSchema}
              apiRequest={handleSubmitModal}
              form={(formProps: any) => (
                <>
                  <Input
                    {...generateFormikInputFieldProps(
                      formProps,
                      INPUTS.EMAIL.NAME
                    )}
                    placeholder={INPUTS.EMAIL.PLACEHOLDER}
                    minWidth="100%"
                    hasEmailIcon={true as boolean}
                    disabled={false}
                  />

                  <Input
                    {...generateFormikInputFieldProps(
                      formProps,
                      INPUTS.PASSWORD.NAME
                    )}
                    placeholder={INPUTS.PASSWORD.PLACEHOLDER}
                    minWidth="100%"
                    inputType={InputType.Password}
                    hasPasswordIcon={true as boolean}
                    disabled={false}
                  />

                  <Button
                    type={ButtonTypes.Primary}
                    name="Log In"
                    buttonType={ButtonType.Submit}
                    // disabled={isLoading}
                    className="submit-form"
                  />

                  {/* <LoadingButton
                    size="small"
                    color="secondary"
                    // onClick={handleClick}
                    loading={isLoading}
                    loadingPosition="end"
                    variant="contained"
                  >
                    Log In
                  </LoadingButton> */}

                  <p className="error">{apiError}</p>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default styled(Login)`
  ${LoginStyle}
`;
