import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "../styled-components/Theme";

import LogoApp from "../images/images/loginImage.jpg";
import { GenericAddEditForm } from "../common/forms-generic-ad-edit/GenericAdEditForm";
import { generateFormikInputFieldProps } from "../forms/formikHelper";
import { INPUTS } from "../common/constants";
import Input from "../common/Input/Input";
import { ButtonType, ButtonTypes } from "../common/Button/models";
import {
  LoginSchema,
  initialValues,
  validationSchema,
} from "../forms/loginSchema";
import Button from "../common/Button/Button";
import { InputType } from "../common/Input/models";
import { LoginStyle } from "../styled-components/LoginStyle";
import Logo from "../images/images/logo2.jpg";

const Login = ({ className }: any) => {
  const [initialFormValues, setInitialFormValues] = useState<LoginSchema>({
    ...initialValues,
  });

  const handleSubmitModal = () => {
    console.log("here");
  };

  return (
    <ThemeProvider theme={Theme}>
      <div className={` ${className} c-auth`}>
        <div className="right-side">
          <img className="login-image" src={LogoApp} alt="logo" />
        </div>
        <div className="left-side">
          <div className="c-auth-container">
            <div className="c-auth-text-container">
              <img className="c-auth-image-container" src={Logo} alt="logo" />
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
