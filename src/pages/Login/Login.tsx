import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "../../theme/Theme";

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
import Logo from "../../assets/images/logo2.jpg";
import { useNavigate } from "react-router-dom";

const Login = ({ className, setUser }: any) => {
  const navigate = useNavigate();
  const [initialFormValues, setInitialFormValues] = useState<LoginSchema>({
    ...initialValues,
  });

  useEffect(() => {
    let statusLog = localStorage.getItem("issac_signIn");
    if (statusLog === "signIn") {
      navigate("/users");
    }
  }, []);

  const handleSubmitModal = (values: any) => {
    const { email, password } = values;
    if (email && password) {
      localStorage.setItem("issac_email", email);
      localStorage.setItem("issac_signIn", "signIn");
      setUser({
        name: email,
        permissions: ["analyze"],
        roles: ["user"],
      });
      navigate("/users");
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
                    // disabled={isLoading}
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

                  {/* <p className="error">{apiError}</p> */}
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
