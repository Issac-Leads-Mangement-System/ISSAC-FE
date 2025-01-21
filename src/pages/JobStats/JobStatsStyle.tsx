import { css } from "styled-components";

export const JobsStatsStyle = () => css`
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
    color: red;
  }
  .row-open {
    color: #155724; /* Dark green text */
  }
  .row-in-progress {
    color: #856404; /* Dark yellow text */
  }

`;
