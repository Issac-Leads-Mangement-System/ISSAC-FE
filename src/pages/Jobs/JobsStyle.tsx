import { css } from "styled-components";

export const JobsStyle = () => css`
  .issac-user-button {
    color: white;
    background: #38454a;
    margin-bottom: 5px;
  }
  .issac-user-button:hover {
    color: white;
    background: #38454a;
    margin-bottom: 5px;
  }

  .title {
    text-align: center;
    padding: 0;
  }

  .row-closed {
    background-color: #f8d7da;
    color: #721c24;
  }
  .row-open {
    background-color: #d4edda; /* Green light background */
    color: #155724; /* Dark green text */
  }
  .row-in-progress {
    background-color: #fff3cd; /* Yellow light background */
    color: #856404; /* Dark yellow text */
  }
`;
