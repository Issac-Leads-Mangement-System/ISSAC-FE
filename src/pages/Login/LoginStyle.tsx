import { css } from "styled-components";

export const LoginStyle = () => css`
  &.issac-auth {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;

    .right-side {
      width: 100%;
      height: 100%;
      min-height: 100vh;
      display: flex;
      flex-flow: column;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .issac-auth-container {
        width: 80%;
        max-width: 345px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        min-height: 90vh;

        .issac-auth-text-container {
          h1 {
            font-size: 36px;
            line-height: 44px;
            margin-bottom: 8px;
            color: #465666;
          }

          p {
            font-size: 14px;
            line-height: 17px;
          }
        }
        .issac-auth-image-container {
          height: 90px;
          display: block;
          margin: auto;
          margin-bottom: 15px;
        }

        .submit-form {
          margin: 0 auto;
          display: block;
          width: 100%;
          height: 46px;
          margin-top: 10px;
          background: black;
          border: 1px solid black;
        }
        .submit-form:hover {
          background: black;
        }
      }
    }

    .left-side {
      width: 100%;
      height: auto;
      min-height: 100vh;
      display: flex;
      align-items: center;

      .login-image {
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        width: 100%;
        height: auto;
        min-height: 100vh;
        transform: scale(1);
      }
    }

    .inputWrapper {
      margin-bottom: 10px;
    }
    .emailAdornment,
    .passwordAdornment {
      color: #ff2f5b !important;
      padding-right: 14px;
    }

    .center-loader {
      margin: 0 auto;
    }

    .error {
      color: #f92d01;
      margin: 5px 0px;
      font-size: 0.75rem;
    }

    .checkEmail {
      color: #2bb89b;
      margin: 5px 0px;
    }
  }
`;
