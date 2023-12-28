import { css } from "styled-components";

export const LoginStyle = () => css`
  &.c-auth {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;

    .left-side {
      width: 100%;
      height: 100%;
      min-height: 100vh;
      display: flex;
      flex-flow: column;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .c-auth-container {
        width: 80%;
        max-width: 345px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        min-height: 90vh;

        .c-auth-text-container {
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
        .c-auth-image-container {
          height: 90px;
          display: block;
          margin: auto;
          margin-bottom: 15px;
        }

        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;

          .remember {
            color: #73879c;
            .MuiFormControlLabel-label {
              font-size: 15px;
            }
          }

          .forgot {
            font-size: 15px;
            cursor: pointer;
            color: #ff2f5b;
            &:hover {
              text-decoration: underline;
            }
          }
        }

        .submit-form {
          margin: 0 auto;
          display: block;
          width: 100%;
          height: 46px;
          margin-top: 10px;
          background: #ff2f5b;
        }
        .submit-form:hover {
          background: #ff2f5ba3;
        }
      }

      .c-auth-details {
        width: 80%;
        text-align: center;
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
        font-size: 13px;

        .c-auth-rights {
          color: #ff2f5b;
        }

        .c-auth-links {
          a {
            color: #ff2f5b;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }

          a:not(:last-child) {
            margin-right: 5px;
            &:after {
              margin-left: 5px;
              content: "|";
            }
          }
        }
      }
    }

    .right-side {
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
